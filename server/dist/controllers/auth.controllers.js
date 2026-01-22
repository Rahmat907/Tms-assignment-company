"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.refreshToken = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prismaClient_1 = require("../prismaClient");
const date_fns_1 = require("date-fns");
const ACCESS_EXP = '15m';
const REFRESH_DAYS = 7;
function signAccess(userId) {
    return jsonwebtoken_1.default.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_EXP });
}
function signRefresh(userId) {
    return jsonwebtoken_1.default.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: `${REFRESH_DAYS}d` });
}
const register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: 'Email and password required' });
    const existing = await prismaClient_1.prisma.user.findUnique({ where: { email } });
    if (existing)
        return res.status(400).json({ message: 'User exists' });
    const hash = await bcrypt_1.default.hash(password, 10);
    const user = await prismaClient_1.prisma.user.create({ data: { email, password: hash } });
    return res.json({ id: user.id, email: user.email });
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: 'Email and password required' });
    const user = await prismaClient_1.prisma.user.findUnique({ where: { email } });
    if (!user)
        return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt_1.default.compare(password, user.password);
    if (!ok)
        return res.status(401).json({ message: 'Invalid credentials' });
    const accessToken = signAccess(user.id);
    const refreshToken = signRefresh(user.id);
    // store refresh token in DB
    const expiresAt = (0, date_fns_1.addDays)(new Date(), REFRESH_DAYS);
    await prismaClient_1.prisma.refreshToken.create({
        data: { token: refreshToken, userId: user.id, expiresAt }
    });
    // set httpOnly cookie (path /auth/refresh recommended)
    res.cookie('jid', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/auth/refresh',
        maxAge: REFRESH_DAYS * 24 * 60 * 60 * 1000
    });
    return res.json({ accessToken });
};
exports.login = login;
const refreshToken = async (req, res) => {
    const token = req.cookies.jid;
    if (!token)
        return res.status(401).json({ message: 'No refresh token' });
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET);
        // check DB token exists and not revoked
        const stored = await prismaClient_1.prisma.refreshToken.findUnique({ where: { token } });
        if (!stored || stored.revoked)
            return res.status(401).json({ message: 'Invalid refresh' });
        // optionally check expiry in DB
        const accessToken = signAccess(payload.userId);
        // (Optional) rotate refresh tokens: skipping for simplicity
        return res.json({ accessToken });
    }
    catch (err) {
        return res.status(401).json({ message: 'Invalid refresh token' });
    }
};
exports.refreshToken = refreshToken;
const logout = async (req, res) => {
    const token = req.cookies.jid;
    if (token) {
        await prismaClient_1.prisma.refreshToken.updateMany({ where: { token }, data: { revoked: true } });
    }
    res.clearCookie('jid', { path: '/auth/refresh' });
    return res.json({ ok: true });
};
exports.logout = logout;
