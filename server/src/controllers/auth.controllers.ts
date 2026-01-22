import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../prismaClient';
import { addDays } from 'date-fns';

const ACCESS_EXP = '15m';
const REFRESH_DAYS = 7;

function signAccess(userId: number) {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: ACCESS_EXP });
}
function signRefresh(userId: number) {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: `${REFRESH_DAYS}d` });
}

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(400).json({ message: 'User exists' });
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hash } });
  return res.json({ id: user.id, email: user.email });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const accessToken = signAccess(user.id);
  const refreshToken = signRefresh(user.id);

  // store refresh token in DB
  const expiresAt = addDays(new Date(), REFRESH_DAYS);
  await prisma.refreshToken.create({
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

export const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies.jid;
  if (!token) return res.status(401).json({ message: 'No refresh token' });

  try {
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string) as { userId: number };
    // check DB token exists and not revoked
    const stored = await prisma.refreshToken.findUnique({ where: { token } });
    if (!stored || stored.revoked) return res.status(401).json({ message: 'Invalid refresh' });

    // optionally check expiry in DB
    const accessToken = signAccess(payload.userId);

    // (Optional) rotate refresh tokens: skipping for simplicity
    return res.json({ accessToken });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
};

export const logout = async (req: Request, res: Response) => {
  const token = req.cookies.jid;
  if (token) {
    await prisma.refreshToken.updateMany({ where: { token }, data: { revoked: true } });
  }
  res.clearCookie('jid', { path: '/auth/refresh' });
  return res.json({ ok: true });
};
