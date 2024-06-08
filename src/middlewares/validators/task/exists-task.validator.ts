import type { Request, Response, NextFunction } from "express";

import { CustomError } from "@errors/custom.error";
import type { ITask } from "@models/task.model";
import { TaskRepository } from "@repositories/task.repository";
import { TaskIdDto } from "@dtos/task";

declare global {
  namespace Express {
    interface Request {
      task: ITask;
    }
  }
}

export const existsTaskValidator = async (req: Request, res: Response, next: NextFunction) => {
  const taskRepository = new TaskRepository();

  const taskIdDto = req.body.paramsValidator as TaskIdDto;
  const projectId = req.project.id;

  const task = await taskRepository.getTaskById(taskIdDto.taskId, projectId);
  if (!task) throw CustomError.notFound(`Task ${taskIdDto.taskId} not found`);

  req.task = task;
  next();
};
