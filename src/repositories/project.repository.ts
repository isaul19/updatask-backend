import { Project } from "@models/project.model";
import type { ProjectIdDto } from "@dtos/project/project-id.dto";
import type { CreateProjectDto } from "@dtos/project";
import type { UpdateProjectDto } from "@dtos/project/update-project.dto";

export class ProjectRepository {
  private projectModel;

  constructor() {
    this.projectModel = Project;
  }

  public listProjects = async () => {
    const projects = await this.projectModel.find();
    return projects;
  };

  public getProjectById = async (projectId: ProjectIdDto) => {
    const project = await this.projectModel.findById(projectId.projectId).populate("tasks");
    return project;
  };

  public createProject = async (project: CreateProjectDto) => {
    const createdProject = new this.projectModel(project);
    await createdProject.save();
    return createdProject;
  };

  public updateProject = async (projectIdDto: ProjectIdDto, updateProjectDto: UpdateProjectDto) => {
    await this.projectModel.updateOne({ _id: projectIdDto.projectId }, updateProjectDto);
  };

  public deleteProject = async (projectIdDto: ProjectIdDto) => {
    await this.projectModel.deleteOne({ _id: projectIdDto.projectId });
  };
}
