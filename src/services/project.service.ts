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

  public createProject = async (createProjectDto: CreateProjectDto) => {
    await this.projectRepository.createProject(createProjectDto);
  };

  public updateProject = async (projectIdDto: ProjectIdDto, updateProjectDto: UpdateProjectDto) => {
    await this.projectRepository.updateProject(projectIdDto, updateProjectDto);
  };

  public deleteProject = async (projectIdDto: ProjectIdDto) => {
    await this.projectRepository.deleteProject(projectIdDto);
  };
}
