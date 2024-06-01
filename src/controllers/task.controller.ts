import { handleError } from "@errors/handle.error";
import type { TaskService } from "@services/task.service";
import type { Request, Response } from "express";

export class TaskController {
  private taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  public createTask = async (req: Request, res: Response) => {
    const { bodyValidator } = req.body;

    try {
      await this.taskService.createTask(bodyValidator, req.project);
      res.status(201).json({ message: "Create Task successfully" });
    } catch (error) {
      handleError(res, error);
    }
  };
}
