import type { ObjectId } from "mongoose";

import { TaskRepository } from "@repositories/task.repository";

import { CustomError } from "@errors/custom.error";

import type { IProject } from "@models/project.model";
import type { ITask } from "@models/task.model";

import type { CreateTaskDto, TaskIdDto, UpdateTaskDto, UpdateTaskStatusDto } from "@dtos/task";
import type { ProjectIdDto } from "@dtos/project";

export class TaskService {
  private taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  public createTask = async (createTaskDto: CreateTaskDto, project: IProject) => {
    const createdTask = {
      ...createTaskDto,
      project: project.id,
    };
    await this.taskRepository.createTask(createdTask, project);
  };

  public listTasks = async (projectIdDto: ProjectIdDto) => {
    const tasks = await this.taskRepository.listTasks(projectIdDto);
    return tasks;
  };

  public getTaskById = async (taskIdDto: TaskIdDto, projectId: ObjectId) => {
    const task = await this.taskRepository.getTaskById(taskIdDto, projectId);
    if (!task) throw CustomError.notFound(`Task ${taskIdDto.taskId} not found`);
    return task;
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
