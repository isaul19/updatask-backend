import { Env } from "@adapters/env.adapter";
import { Print } from "@adapters/print.adapter";
import { Application } from "express";
import swaggerJsDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { projectPath } from "./paths";

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: 'Documentation "Updatask"',
    version: "1.0.0",
  },
  paths: {
    ...projectPath,
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition: swaggerDefinition,
  apis: [],
};

const swaggerDoc = swaggerJsDoc(swaggerOptions);

export const inicializateDocs = (app: Application) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  Print.success(`Docs available in http://localhost:${Env.SERVER_PORT}/docs`);
};
