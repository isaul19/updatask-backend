import { MongoIdDto } from "@dtos/_common/mongo-id.dto";
import { CustomError } from "@errors/custom.error";
import { handleError } from "@errors/handle.error";
import { ProjectRepository } from "@repositories/project.repository";
import type { NextFunction, Request, Response } from "express";

export const existsProjectValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { paramsValidator } = req.body;

  try {
    const projectRepository = new ProjectRepository();
    const project = await projectRepository.getProjectById(paramsValidator as MongoIdDto);
    if (!project) throw CustomError.notFound("Project not found");

    req.body.project = project;
    next();
  } catch (error) {
    handleError(res, error);
  }
};
