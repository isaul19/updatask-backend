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
    const project = req.project;
    res.status(200).json({ message: "Get Project successfully", data: project });
  };

  public createProject = async (req: Request, res: Response) => {
    const createProjectDto = req.body.bodyValidator;
    await this.projectService.createProject(createProjectDto);
    res.status(201).json({ message: "Create Project successfully" });
  };

  public updateProject = async (req: Request, res: Response) => {
    const updateProjectDto = req.body.bodyValidator;
    const projectId = req.project.id;
    await this.projectService.updateProject(projectId, updateProjectDto);
    res.status(200).json({ message: "Update Project successfully" });
  };

  public deleteProject = async (req: Request, res: Response) => {
    const projectId = req.project.id;
    await this.projectService.deleteProject(projectId);
    res.status(200).json({ message: "Delete Project successfully" });
  };
}
