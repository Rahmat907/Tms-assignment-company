"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleTask = exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getTasks = exports.createTask = void 0;
const prismaClient_1 = require("../prismaClient");
const createTask = async (req, res) => {
    const userId = req.userId;
    const { title, description } = req.body;
    if (!title)
        return res.status(400).json({ message: 'Title required' });
    const task = await prismaClient_1.prisma.task.create({ data: { title, description, userId } });
    return res.status(201).json(task);
};
exports.createTask = createTask;
const getTasks = async (req, res) => {
    const userId = req.userId;
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Number(req.query.limit) || 10);
    const status = req.query.status;
    const search = req.query.search;
    const where = { userId };
    if (status === 'completed')
        where.completed = true;
    if (status === 'pending')
        where.completed = false;
    if (search)
        where.title = { contains: search, mode: 'insensitive' };
    const total = await prismaClient_1.prisma.task.count({ where });
    const tasks = await prismaClient_1.prisma.task.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' }
    });
    return res.json({ total, page, limit, tasks });
};
exports.getTasks = getTasks;
const getTaskById = async (req, res) => {
    const userId = req.userId;
    const id = Number(req.params.id);
    const task = await prismaClient_1.prisma.task.findFirst({ where: { id, userId } });
    if (!task)
        return res.status(404).json({ message: 'Not found' });
    return res.json(task);
};
exports.getTaskById = getTaskById;
const updateTask = async (req, res) => {
    const userId = req.userId;
    const id = Number(req.params.id);
    const { title, description, completed } = req.body;
    const task = await prismaClient_1.prisma.task.findFirst({ where: { id, userId } });
    if (!task)
        return res.status(404).json({ message: 'Not found' });
    const updated = await prismaClient_1.prisma.task.update({
        where: { id },
        data: { title: title ?? task.title, description: description ?? task.description, completed: completed ?? task.completed }
    });
    return res.json(updated);
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    const userId = req.userId;
    const id = Number(req.params.id);
    const task = await prismaClient_1.prisma.task.findFirst({ where: { id, userId } });
    if (!task)
        return res.status(404).json({ message: 'Not found' });
    await prismaClient_1.prisma.task.delete({ where: { id } });
    return res.json({ ok: true });
};
exports.deleteTask = deleteTask;
const toggleTask = async (req, res) => {
    const userId = req.userId;
    const id = Number(req.params.id);
    const task = await prismaClient_1.prisma.task.findFirst({ where: { id, userId } });
    if (!task)
        return res.status(404).json({ message: 'Not found' });
    const updated = await prismaClient_1.prisma.task.update({ where: { id }, data: { completed: !task.completed } });
    return res.json(updated);
};
exports.toggleTask = toggleTask;
