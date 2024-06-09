import type { ObjectId } from "mongoose";

import { TaskRepository } from "@repositories/task.repository";
import type { IProject } from "@models/project.model";
import type { CreateTaskDto, UpdateTaskDto, UpdateTaskStatusDto } from "@dtos/task";

export class TaskService {
  private taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  public listTasks = async (projectId: ObjectId) => {
    const tasks = await this.taskRepository.listTasks(projectId);
    return tasks;
  };

  public createTask = async (createTaskDto: CreateTaskDto, project: IProject) => {
    const createdTask = {
      ...createTaskDto,
      project: project.id,
    };
    await this.taskRepository.createTask(createdTask, project);
  };

  public updateTask = async (updateTaskDto: UpdateTaskDto, taskId: ObjectId, projectId: ObjectId) => {
    await this.taskRepository.updateTask(updateTaskDto, taskId, projectId);
  };

  public deleteTask = async (taskId: ObjectId, project: IProject) => {
    await this.taskRepository.deleteTask(taskId, project);
  };

  public updateTaskStatus = async (updateTaskStatusDto: UpdateTaskStatusDto, taskId: ObjectId, projectId: ObjectId) => {
    await this.taskRepository.updateTaskStatus(updateTaskStatusDto, taskId, projectId);
  };
}
