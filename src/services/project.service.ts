import type { CreateProjectDto } from "@dtos/project";
import { ProjectRepository } from "../repositories/project.repository";

export class ProjectService {
  private projectRepository: ProjectRepository;

  constructor() {
    this.projectRepository = new ProjectRepository();
  }

  public listProjects = async () => {
    const projects = await this.projectRepository.listProjects();
    return projects;
  };

  public createProject = async (project: CreateProjectDto) => {
    await this.projectRepository.createProject(project);
  };
}
