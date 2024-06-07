import { type TaskStatus, taskStatus } from "@models/task.model";
import { IsEnum } from "class-validator";

export class UpdateTaskStatusDto {
  @IsEnum(Object.values(taskStatus))
  status!: TaskStatus;
}
