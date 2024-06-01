import { ProjectRepository } from "@repositories/project.repository";
import type { ProjectIdDto } from "@dtos/_common/project-id.dto";
import type { CreateProjectDto } from "@dtos/project";
import type { UpdateProjectDto } from "@dtos/project/update-project.dto";

export class ProjectService {
  private projectRepository: ProjectRepository;

  constructor() {
    this.projectRepository = new ProjectRepository();
  }

  public listProjects = async () => {
    const projects = await this.projectRepository.listProjects();
    return projects;
  };

  public getProjectById = async (projectId: ProjectIdDto) => {
    const project = await this.projectRepository.getProjectById(projectId);
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
