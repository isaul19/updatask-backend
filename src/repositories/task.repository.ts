import { Task } from "@models/task.model";
import type { IProject } from "@models/project.model";
import type { CreateTaskDto } from "@dtos/task";
import type { ProjectIdDto } from "@dtos/_common/project-id.dto";
import type { TaskIdDto } from "@dtos/task/task-id.dto";
import type { ObjectId } from "mongoose";
import type { UpdateTaskDto } from "@dtos/task/update-task.dto";

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

  public listTasks = async (projectIdDto: ProjectIdDto) => {
    const tasks = await this.taskModel.find({ project: projectIdDto.projectId }).populate("project");
    return tasks;
  };

  public getTaskById = async (taskId: TaskIdDto, projectId: ObjectId) => {
    const task = await this.taskModel.findOne({ _id: taskId.taskId, project: projectId });
    return task;
  };

  public updateTask = async (taskId: TaskIdDto, projectId: ObjectId, updateTaskDto: UpdateTaskDto) => {
    await this.taskModel.updateOne({ _id: taskId.taskId, project: projectId }, updateTaskDto);
  };

  public deleteTask = async (taskId: TaskIdDto, projectId: ObjectId) => {
    await this.taskModel.deleteOne({ _id: taskId.taskId, project: projectId });
  };
}
