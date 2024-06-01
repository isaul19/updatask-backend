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
    project.tasks.push(createdTask);

    await Promise.allSettled([createdTask.save(), project.save()]);
    return createdTask;
  };
}
