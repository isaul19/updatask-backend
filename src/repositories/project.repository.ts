import type { CreateProjectDto } from "@dtos/project";
import { Project } from "@models/project.modal";

export class ProjectRepository {
  private projectModel;

  constructor() {
    this.projectModel = Project;
  }

  public listProjects = async () => {
    const projects = await this.projectModel.find();
    return projects;
  };

  public createProject = async (project: CreateProjectDto) => {
    const createdProject = new this.projectModel(project);
    await createdProject.save();
    return createdProject;
  };
}
