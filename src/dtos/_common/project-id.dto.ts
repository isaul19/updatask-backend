import { IsMongoId } from "class-validator";

export class ProjectIdDto {
  @IsMongoId()
  projectId!: string;
}
