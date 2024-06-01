import { Task } from "@models/task.model";
import type { IProject } from "@models/project.model";
import type { CreateTaskDto } from "@dtos/task";

export class TaskRepository {
  private taskModel;

  constructor() {
    this.taskModel = Task;
  }

  public createTask = async (createTaskDto: CreateTaskDto, project: IProject) => {
    const createdTask = new this.taskModel(createTaskDto);
    await createdTask.save();

    project.tasks.push(createdTask);
    await project.save();

    return createdTask;
  };
}
