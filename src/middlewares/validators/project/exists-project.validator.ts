import { ProjectIdDto } from "@dtos/_common/project-id.dto";
import { CustomError } from "@errors/custom.error";
import { handleError } from "@errors/handle.error";
import { IProject } from "@models/project.model";
import { ProjectRepository } from "@repositories/project.repository";
import type { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      project: IProject;
    }
  }
}

export const existsProjectValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { paramsValidator } = req.body;

  try {
    const projectRepository = new ProjectRepository();
    const project = await projectRepository.getProjectById(paramsValidator as ProjectIdDto);
    if (!project) throw CustomError.notFound("Project not found");

    req.project = project;
    next();
  } catch (error) {
    handleError(res, error);
  }
};
