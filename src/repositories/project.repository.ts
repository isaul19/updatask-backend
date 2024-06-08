import type { ObjectId } from "mongoose";
import { Project } from "@models/project.model";
import type { CreateProjectDto, UpdateProjectDto } from "@dtos/project";

export class ProjectRepository {
  private projectModel;

  constructor() {
    this.projectModel = Project;
  }

  public listProjects = async () => {
    const projects = await this.projectModel.find();
    return projects;
  };

  public getProjectById = async (projectId: ObjectId) => {
    const project = await this.projectModel.findById(projectId).populate("tasks");
    return project;
  };

  public createProject = async (project: CreateProjectDto) => {
    const createdProject = new this.projectModel(project);
    await createdProject.save();
    return createdProject;
  };

  public updateProject = async (projectId: ObjectId, updateProjectDto: UpdateProjectDto) => {
    await this.projectModel.updateOne({ _id: projectId }, updateProjectDto);
  };

  public deleteProject = async (projectId: ObjectId) => {
    await this.projectModel.deleteOne({ _id: projectId });
  };
}
