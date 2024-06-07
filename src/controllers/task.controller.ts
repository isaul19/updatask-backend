import type { Request, Response } from "express";
import type { TaskService } from "@services/task.service";

export class TaskController {
  private taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  public createTask = async (req: Request, res: Response) => {
    const { bodyValidator } = req.body;

    await this.taskService.createTask(bodyValidator, req.project);
    res.status(201).json({ message: "Create Task successfully" });
  };

  public listTasks = async (req: Request, res: Response) => {
    const { paramsValidator } = req.body;

    const data = await this.taskService.listTasks(paramsValidator);
    res.status(200).json({ message: "Get Tasks successfully", data });
  };

  public getTaskById = async (req: Request, res: Response) => {
    const { paramsValidator } = req.body;
    const project = req.project;

    const data = await this.taskService.getTaskById(paramsValidator, project.id);
    res.status(200).json({ message: "Get Task successfully", data });
  };

  public updateTask = async (req: Request, res: Response) => {
    const { bodyValidator } = req.body;
    const taskId = req.task.id;
    const projectId = req.project.id;

    await this.taskService.updateTask(bodyValidator, taskId, projectId);
    res.status(200).json({ message: "Update Task successfully" });
  };

  public deleteTask = async (req: Request, res: Response) => {
    await this.taskService.deleteTask(req.task, req.project);
    res.status(200).json({ message: "Delete Task successfully" });
  };

  public updateTaskStatus = async (req: Request, res: Response) => {
    const { bodyValidator } = req.body;
    const projectId = req.project.id;
    const taskId = req.task.id;

    await this.taskService.updateTaskStatus(bodyValidator, taskId, projectId);
    res.status(200).json({ message: "Update Task Status successfully" });
  };
}
