import express from "express";
import { ProjectController } from "@controllers/project.controller";
import { ProjectService } from "@services/project.service";
import { CreateProjectDto } from "@dtos/project";
import { bodyValidator } from "@middlewares/validators/_common/body.validator";

export class ProjectRouter {
  public static get router() {
    const router = express.Router();

    const projectService = new ProjectService();
    const projectController = new ProjectController(projectService);

    router.get("/", projectController.listProjects);
    router.post("/", bodyValidator(CreateProjectDto), projectController.createProject);

    return router;
  }
}
