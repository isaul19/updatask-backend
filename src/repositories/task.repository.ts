import type { ObjectId } from "mongoose";
import { Task } from "@models/task.model";
import type { IProject } from "@models/project.model";
import type { CreateTaskDto, UpdateTaskDto, UpdateTaskStatusDto } from "@dtos/task";

export class TaskRepository {
  private taskModel;

  constructor() {
    this.taskModel = Task;
  }

  public createTask = async (createTaskDto: CreateTaskDto, project: IProject) => {
    const createdTask = new this.taskModel(createTaskDto);
    project.tasks.push(createdTask);

    await Promise.allSettled([createdTask.save(), project.save()]);
    return createdTask;
  };

  public getTaskById = async (taskId: ObjectId, projectId: ObjectId) => {
    const task = await this.taskModel.findOne({ _id: taskId, project: projectId });
    return task;
  };

  public updateTask = async (updateTaskDto: UpdateTaskDto, taskId: ObjectId, projectId: ObjectId) => {
    await this.taskModel.updateOne({ _id: taskId, project: projectId }, updateTaskDto);
  };

  public deleteTask = async (taskId: ObjectId, project: IProject) => {
    project.tasks.filter((task) => task?.id !== taskId);
    await Promise.allSettled([this.taskModel.deleteOne({ _id: taskId, project: project.id }), project.save()]);
  };

  public updateTaskStatus = async (updateTaskDto: UpdateTaskStatusDto, taskId: ObjectId, projectId: ObjectId) => {
    await this.taskModel.updateOne({ _id: taskId, project: projectId }, updateTaskDto);
  };
}
