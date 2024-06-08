import type { NextFunction, Request, Response } from "express";

import { CustomError } from "@errors/custom.error";
import { IProject } from "@models/project.model";
import { ProjectRepository } from "@repositories/project.repository";
import { ProjectIdDto } from "@dtos/project";

declare global {
  namespace Express {
    interface Request {
      project: IProject;
    }
  }
}

export const existsProjectValidator = async (req: Request, res: Response, next: NextFunction) => {
  const projectRepository = new ProjectRepository();

  const projectIdDto = req.body.paramsValidator as ProjectIdDto;

  const project = await projectRepository.getProjectById(projectIdDto.projectId);
  if (!project) throw CustomError.notFound(`Project ${projectIdDto.projectId} not found`);

  req.project = project;
  next();
};
