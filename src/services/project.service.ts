import type { ObjectId } from "mongoose";
import { ProjectRepository } from "@repositories/project.repository";
import type { CreateProjectDto, UpdateProjectDto } from "@dtos/project";

export class ProjectService {
  private projectRepository: ProjectRepository;

  constructor() {
    this.projectRepository = new ProjectRepository();
  }

  public listProjects = async () => {
    const projects = await this.projectRepository.listProjects();
    return projects;
  };

  public createProject = async (createProjectDto: CreateProjectDto) => {
    await this.projectRepository.createProject(createProjectDto);
  };

  public updateProject = async (projectId: ObjectId, updateProjectDto: UpdateProjectDto) => {
    await this.projectRepository.updateProject(projectId, updateProjectDto);
  };

  public deleteProject = async (projectId: ObjectId) => {
    await this.projectRepository.deleteProject(projectId);
  };
}
