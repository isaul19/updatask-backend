import type { Request, Response } from "express";

export class ProjectController {
  public listProjects = async (req: Request, res: Response) => {
    res.send("hola");
  };
}
