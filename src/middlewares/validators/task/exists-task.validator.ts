import { TaskIdDto } from "@dtos/task/task-id.dto";
import { CustomError } from "@errors/custom.error";
import { handleError } from "@errors/handle.error";
import type { ITask } from "@models/task.model";
import { TaskRepository } from "@repositories/task.repository";
import type { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      task: ITask;
    }
  }
}

export const existsTaskValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { paramsValidator } = req.body;
  const taskIdDto = paramsValidator as TaskIdDto;
  try {
    const taskRepository = new TaskRepository();
    const task = await taskRepository.getTaskById(taskIdDto, req.project.id);
    if (!task) throw CustomError.notFound(`Task ${taskIdDto.taskId} not found`);

    req.task = task;
    next();
  } catch (error) {
    handleError(res, error);
  }
};
