import { Task } from "@models/task.model";
import type { IProject } from "@models/project.model";
import type { CreateTaskDto } from "@dtos/task";
import type { TaskIdDto } from "@dtos/task/task-id.dto";
import type { ObjectId } from "mongoose";
import type { UpdateTaskDto } from "@dtos/task/update-task.dto";
import type { UpdateTaskStatusDto } from "@dtos/task/update-task-status.dto";

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

  public getTaskById = async (taskId: TaskIdDto, projectId: ObjectId) => {
    const task = await this.taskModel.findOne({ _id: taskId.taskId, project: projectId });
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
