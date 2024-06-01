import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateProjectDto {
  @IsString()
  @MinLength(2)
  projectName!: string;

  @IsString()
  @MinLength(2)
  clientName!: string;

  @IsString()
  @MinLength(2)
  description!: string;
}
