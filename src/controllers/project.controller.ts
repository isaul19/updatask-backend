import type { Request, Response } from "express";
import { MongooseError } from "mongoose";
import { Print } from "@adapters/print.adapter";
import type { ProjectService } from "@services/project.service";
import { Project } from "@models/project.modal";
import { handleError } from "@config/errors/handle.error";

export class ProjectController {
  private projectService: ProjectService;

  constructor(projectService: ProjectService) {
    this.projectService = projectService;
  }

  public listProjects = async (req: Request, res: Response) => {
    try {
      const projects = await this.projectService.listProjects();
      res.status(200).json({ message: "List Projects successfully", data: projects });
    } catch (error) {
      handleError(res, error);
    }
  };

  public createProject = async (req: Request, res: Response) => {
    const { bodyValidator } = req.body;
    try {
      await this.projectService.createProject(bodyValidator);
    } catch (error) {
      handleError(res, error);
    }
  };
}
