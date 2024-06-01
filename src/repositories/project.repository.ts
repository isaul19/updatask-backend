import type { MongoIdDto } from "@dtos/_common/mongo-id.dto";
import type { CreateProjectDto } from "@dtos/project";
import type { UpdateProjectDto } from "@dtos/project/update-project.dto";
import { Project } from "@models/project.model";

export class ProjectRepository {
  private projectModel;

  constructor() {
    this.projectModel = Project;
  }

  public listProjects = async () => {
    const projects = await this.projectModel.find();
    return projects;
  };

  public getProjectById = async (projectId: MongoIdDto) => {
    const project = await this.projectModel.findById(projectId.id);
    return project;
  };

  public createProject = async (project: CreateProjectDto) => {
    const createdProject = new this.projectModel(project);
    await createdProject.save();
    return createdProject;
  };

  public updateProject = async (mongoIdDto: MongoIdDto, updateProjectDto: UpdateProjectDto) => {
    await this.projectModel.updateOne({ _id: mongoIdDto.id }, updateProjectDto);
  };

  public deleteProject = async (mongoIdDto: MongoIdDto) => {
    await this.projectModel.deleteOne({ _id: mongoIdDto.id });
  };
}
