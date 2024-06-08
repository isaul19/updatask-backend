import { IsMongoId } from "class-validator";
import { ObjectId } from "mongoose";

export class ProjectIdDto {
  @IsMongoId()
  projectId!: ObjectId;
}
