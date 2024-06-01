import type { CreateTaskDto } from "@dtos/task";
import type { IProject } from "@models/project.model";
import { TaskRepository } from "@repositories/task.repository";

export class TaskService {
  private taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  public createTask = async (createTaskDto: CreateTaskDto, project: IProject) => {
    createTaskDto.project = project.id;
    await this.taskRepository.createTask(createTaskDto);
  };
}
