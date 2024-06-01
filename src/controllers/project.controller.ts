import type { Request, Response } from "express";
import type { ProjectService } from "@services/project.service";
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

  public getProjectById = async (req: Request, res: Response) => {
    const { paramsValidator } = req.body;
    try {
      const project = await this.projectService.getProjectById(paramsValidator);
      res.status(200).json({ message: "Get Project successfully", data: project });
    } catch (error) {
      handleError(res, error);
    }
  };

  public createProject = async (req: Request, res: Response) => {
    const { bodyValidator } = req.body;
    try {
      await this.projectService.createProject(bodyValidator);
      res.status(201).json({ message: "Create Project successfully" });
    } catch (error) {
      handleError(res, error);
    }
  };
}
