import express from "express";
import { ProjectController } from "@controllers/project.controller";

export class ProjectRouter {
  public static get router() {
    const projectController = new ProjectController();
    const router = express.Router();

    router.get("/list", projectController.listProjects);

    return router;
  }
}
