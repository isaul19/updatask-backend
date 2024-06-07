import { ProjectRepository } from "@repositories/project.repository";

import { CustomError } from "@errors/custom.error";

import type { CreateProjectDto, ProjectIdDto, UpdateProjectDto } from "@dtos/project";

export class ProjectService {
  private projectRepository: ProjectRepository;

  constructor() {
    this.projectRepository = new ProjectRepository();
  }

  public listProjects = async () => {
    const projects = await this.projectRepository.listProjects();
    return projects;
  };

  public getProjectById = async (projectIdDto: ProjectIdDto) => {
    const project = await this.projectRepository.getProjectById(projectIdDto);
    if (!project) throw CustomError.notFound(`project ${projectIdDto.projectId} not found`);
    return project;
  };

  public createProject = async (project: CreateProjectDto) => {
    await this.projectRepository.createProject(project);
  };

  public updateProject = async (projectId: ProjectIdDto, project: UpdateProjectDto) => {
    await this.projectRepository.updateProject(projectId, project);
  };

  public deleteProject = async (projectId: ProjectIdDto) => {
    await this.projectRepository.deleteProject(projectId);
  };
}
