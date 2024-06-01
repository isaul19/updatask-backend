import { IsOptional, IsString, MinLength } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateTaskDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsString()
  @MinLength(2)
  description!: string;

  @IsOptional()
  project?: ObjectId;
}
