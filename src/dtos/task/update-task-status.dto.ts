import { type TaskStatus, taskStatus } from "@models/task.model";
import { IsEnum } from "class-validator";

export class UpdateTaskStatusDto {
  @IsEnum(Object.values(taskStatus), {
    message: `Status must be one of the following values: [${Object.values(taskStatus)}]`,
  })
  status!: TaskStatus;
}
