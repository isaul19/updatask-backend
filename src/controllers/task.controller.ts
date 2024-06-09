import type { Request, Response } from "express";

import type { TaskService } from "@services/task.service";

export class TaskController {
  private taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  public listTasks = async (req: Request, res: Response) => {
    const projectId = req.project.id;
    const tasks = await this.taskService.listTasks(projectId);
    res.status(200).json({ message: "List Tasks successfully", data: tasks });
  };

  public createTask = async (req: Request, res: Response) => {
    const createTaskDto = req.body.bodyValidator;
    const project = req.project;

    await this.taskService.createTask(createTaskDto, project);
    res.status(201).json({ message: "Create Task successfully" });
  };

  public updateTask = async (req: Request, res: Response) => {
    const updateTaskDto = req.body.bodyValidator;
    const taskId = req.task.id;
    const projectId = req.project.id;

    await this.taskService.updateTask(updateTaskDto, taskId, projectId);
    res.status(200).json({ message: "Update Task successfully" });
  };

  public deleteTask = async (req: Request, res: Response) => {
    const project = req.project;
    const taskId = req.task.id;

    await this.taskService.deleteTask(taskId, project);
    res.status(200).json({ message: "Delete Task successfully" });
  };

  public updateTaskStatus = async (req: Request, res: Response) => {
    const updateTaskStatusDto = req.body.bodyValidator;
    const projectId = req.project.id;
    const taskId = req.task.id;

    await this.taskService.updateTaskStatus(updateTaskStatusDto, taskId, projectId);
    res.status(200).json({ message: "Update Task Status successfully" });
  };
}
