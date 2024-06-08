import type { NextFunction, Request, Response } from "express";

import { CustomError } from "@errors/custom.error";
import { IProject } from "@models/project.model";
import { ProjectRepository } from "@repositories/project.repository";

declare global {
  namespace Express {
    interface Request {
      project: IProject;
    }
  }
}

export const existsProjectValidator = async (req: Request, res: Response, next: NextFunction) => {
  const projectRepository = new ProjectRepository();

  const projectIdDto = req.body.paramsValidator;

  const project = await projectRepository.getProjectById(projectIdDto);
  if (!project) throw CustomError.notFound(`Project ${projectIdDto.projectId} not found`);

  req.project = project;
  next();
};
