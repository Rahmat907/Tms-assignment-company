import { Request, Response } from 'express';
import { prisma } from '../prismaClient';

type Req = Request & { userId?: number };

export const createTask = async (req: Req, res: Response) => {
  const userId = req.userId!;
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ message: 'Title required' });
  const task = await prisma.task.create({ data: { title, description, userId } });
  return res.status(201).json(task);
};

export const getTasks = async (req: Req, res: Response) => {
  const userId = req.userId!;
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Number(req.query.limit) || 10);
  const status = req.query.status as string | undefined; 
  const search = req.query.search as string | undefined;

  const where: any = { userId };
  if (status === 'completed') where.completed = true;
  if (status === 'pending') where.completed = false;
  if (search) where.title = { contains: search, mode: 'insensitive' };

  const total = await prisma.task.count({ where });
  const tasks = await prisma.task.findMany({
    where,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: 'desc' }
  });

  return res.json({ total, page, limit, tasks });
};

export const getTaskById = async (req: Req, res: Response) => {
  const userId = req.userId!;
  const id = Number(req.params.id);
  const task = await prisma.task.findFirst({ where: { id, userId } });
  if (!task) return res.status(404).json({ message: 'Not found' });
  return res.json(task);
};

export const updateTask = async (req: Req, res: Response) => {
  const userId = req.userId!;
  const id = Number(req.params.id);
  const { title, description, completed } = req.body;
  const task = await prisma.task.findFirst({ where: { id, userId } });
  if (!task) return res.status(404).json({ message: 'Not found' });
  const updated = await prisma.task.update({
    where: { id },
    data: { title: title ?? task.title, description: description ?? task.description, completed: completed ?? task.completed }
  });
  return res.json(updated);
};

export const deleteTask = async (req: Req, res: Response) => {
  const userId = req.userId!;
  const id = Number(req.params.id);
  const task = await prisma.task.findFirst({ where: { id, userId } });
  if (!task) return res.status(404).json({ message: 'Not found' });
  await prisma.task.delete({ where: { id } });
  return res.json({ ok: true });
};

export const toggleTask = async (req: Req, res: Response) => {
  const userId = req.userId!;
  const id = Number(req.params.id);
  const task = await prisma.task.findFirst({ where: { id, userId } });
  if (!task) return res.status(404).json({ message: 'Not found' });
  const updated = await prisma.task.update({ where: { id }, data: { completed: !task.completed } });
  return res.json(updated);
};
