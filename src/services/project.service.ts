import { ProjectRepository } from "@repositories/project.repository";
import type { MongoIdDto } from "@dtos/_common/mongo-id.dto";
import type { CreateProjectDto } from "@dtos/project";
import { CustomError } from "@config/errors/custom.error";

export class ProjectService {
  private projectRepository: ProjectRepository;

  constructor() {
    this.projectRepository = new ProjectRepository();
  }

  public listProjects = async () => {
    const projects = await this.projectRepository.listProjects();
    return projects;
  };

  public getProjectById = async (projectId: MongoIdDto) => {
    const project = await this.projectRepository.getProjectById(projectId);
    if (!project) throw CustomError.notFound(`Project with id: ${projectId} not found`);
    return project;
  };

  public createProject = async (project: CreateProjectDto) => {
    await this.projectRepository.createProject(project);
  };
}
