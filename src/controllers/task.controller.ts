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

  public listTasks = async (req: Request, res: Response) => {
    const { paramsValidator } = req.body;

    try {
      const data = await this.taskService.listTasks(paramsValidator);
      res.status(200).json({ message: "Get Tasks successfully", data });
    } catch (error) {
      handleError(res, error);
    }
  };

  public getTaskById = async (req: Request, res: Response) => {
    const { paramsValidator } = req.body;

    try {
      const data = await this.taskService.getTaskById(paramsValidator);
      res.status(200).json({ message: "Get Task successfully", data });
    } catch (error) {
      handleError(res, error);
    }
  };
}
