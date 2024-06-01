import { Task } from "@models/task.model";
import type { IProject } from "@models/project.model";
import type { CreateTaskDto } from "@dtos/task";
import type { ProjectIdDto } from "@dtos/_common/project-id.dto";
import type { TaskIdDto } from "@dtos/task/task-id.dto";

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

  public getTaskById = async (taskId: TaskIdDto) => {
    const task = await this.taskModel.findById(taskId.taskId);
    return task;
  };
}
