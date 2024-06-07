import { Router } from "express";

import { wrapGlobalHandlerError } from "@errors/global-handle.error";

import { ProjectService } from "@services/project.service";
import { TaskService } from "@services/task.service";

import { ProjectController } from "@controllers/project.controller";
import { TaskController } from "@controllers/task.controller";

import { bodyValidator, paramsValidator } from "@middlewares/validators/_common";
import { existsTaskValidator } from "@middlewares/validators/task";
import { existsProjectValidator } from "@middlewares/validators/project";

import { CreateProjectDto, ProjectIdDto, UpdateProjectDto } from "@dtos/project";
import { CreateTaskDto, TaskIdDto, UpdateTaskStatusDto } from "@dtos/task";

export class ProjectRouter {
  public static get router() {
    const router = Router();
    wrapGlobalHandlerError(router);

    const projectService = new ProjectService();
    const projectController = new ProjectController(projectService);

    const taskService = new TaskService();
    const taskController = new TaskController(taskService);

    router.get("/", projectController.listProjects);
    router.get("/:projectId", paramsValidator(ProjectIdDto), projectController.getProjectById);
    router.post("/", bodyValidator(CreateProjectDto), projectController.createProject);
    router.put(
      "/:projectId",
      paramsValidator(ProjectIdDto),
      existsProjectValidator,
      bodyValidator(UpdateProjectDto),
      projectController.updateProject,
    );

    router.delete("/:projectId", paramsValidator(ProjectIdDto), projectController.deleteProject);

    router.post(
      "/:projectId/task",
      paramsValidator(ProjectIdDto),
      existsProjectValidator,
      bodyValidator(CreateTaskDto),
      taskController.createTask,
    );

    router.get("/:projectId/task", paramsValidator(ProjectIdDto), existsProjectValidator, taskController.listTasks);

    router.get(
      "/:projectId/task/:taskId",
      paramsValidator(ProjectIdDto),
      existsProjectValidator,
      paramsValidator(TaskIdDto),
      taskController.getTaskById,
    );

    router.put(
      "/:projectId/task/:taskId",
      paramsValidator(ProjectIdDto),
      existsProjectValidator,
      paramsValidator(TaskIdDto),
      existsTaskValidator,
      taskController.updateTask,
    );

    router.delete(
      "/:projectId/task/:taskId",
      paramsValidator(ProjectIdDto),
      existsProjectValidator,
      paramsValidator(TaskIdDto),
      existsTaskValidator,
      taskController.deleteTask,
    );

    router.post(
      "/:projectId/task/:taskId/status",
      paramsValidator(ProjectIdDto),
      existsProjectValidator,
      paramsValidator(TaskIdDto),
      existsTaskValidator,
      bodyValidator(UpdateTaskStatusDto),
      taskController.updateTaskStatus,
    );

    return router;
  }
}
