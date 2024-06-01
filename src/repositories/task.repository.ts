import { Task } from "@models/task.model";
import type { CreateTaskDto } from "@dtos/task";

export class TaskRepository {
  private taskModel;

  constructor() {
    this.taskModel = Task;
  }

  public createTask = async (createTaskDto: CreateTaskDto) => {
    const createdTask = new this.taskModel(createTaskDto);
    await createdTask.save();
    return createdTask;
  };
}
