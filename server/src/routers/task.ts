import { Router } from 'express';
import { requireAuth } from '../middlewares/auth';
import {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  toggleTask
} from '../controllers/task.controller';

export const tasksRouter = Router();

tasksRouter.use(requireAuth);

tasksRouter.get('/', getTasks);
tasksRouter.post('/', createTask);
tasksRouter.get('/:id', getTaskById);
tasksRouter.patch('/:id', updateTask);
tasksRouter.delete('/:id', deleteTask);
tasksRouter.patch('/:id/toggle', toggleTask);
