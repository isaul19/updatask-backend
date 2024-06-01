import express from "express";
import { ProjectController } from "@controllers/project.controller";
import { ProjectService } from "@services/project.service";
import { CreateProjectDto } from "@dtos/project";
import { bodyValidator } from "@middlewares/validators/_common/body.validator";
import { paramsValidator } from "@middlewares/validators/_common/params.validator";
import { UpdateProjectDto } from "@dtos/project/update-project.dto";
import { TaskService } from "@services/task.service";
import { TaskController } from "@controllers/task.controller";
import { existsProjectValidator } from "@middlewares/validators/project/exists-project.validator";
import { ProjectIdDto } from "@dtos/_common/project-id.dto";
import { CreateTaskDto } from "@dtos/task";
import { TaskIdDto } from "@dtos/task/task-id.dto";
import { existsTaskValidator } from "@middlewares/validators/task/exists-task.validator";

export class ProjectRouter {
  public static get router() {
    const router = express.Router();

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

    return router;
  }
}
