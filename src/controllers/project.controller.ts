import type { Request, Response } from "express";
import type { ProjectService } from "@services/project.service";

export class ProjectController {
  private projectService: ProjectService;

  constructor(projectService: ProjectService) {
    this.projectService = projectService;
  }

  public listProjects = async (req: Request, res: Response) => {
    const projects = await this.projectService.listProjects();
    res.status(200).json({ message: "List Projects successfully", data: projects });
  };

  public getProjectById = async (req: Request, res: Response) => {
    const { paramsValidator } = req.body;
    const project = await this.projectService.getProjectById(paramsValidator);
    res.status(200).json({ message: "Get Project successfully", data: project });
  };

  public createProject = async (req: Request, res: Response) => {
    const { bodyValidator } = req.body;
    await this.projectService.createProject(bodyValidator);
    res.status(201).json({ message: "Create Project successfully" });
  };

  public updateProject = async (req: Request, res: Response) => {
    const { paramsValidator, bodyValidator } = req.body;
    await this.projectService.updateProject(paramsValidator, bodyValidator);
    res.status(200).json({ message: "Update Project successfully" });
  };

  public deleteProject = async (req: Request, res: Response) => {
    const { paramsValidator } = req.body;
    await this.projectService.deleteProject(paramsValidator);
    res.status(200).json({ message: "Delete Project successfully" });
  };
}
