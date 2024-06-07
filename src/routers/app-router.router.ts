import { Router } from "express";

import { ProjectRouter } from "@routers/project.router";

export class AppRouter {
  public static get router() {
    const router = Router();

    router.use("/project", ProjectRouter.router);

    return router;
  }
}
