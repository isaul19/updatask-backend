import { IsMongoId } from "class-validator";
import { ObjectId } from "mongoose";

export class TaskIdDto {
  @IsMongoId()
  taskId!: ObjectId;
}
