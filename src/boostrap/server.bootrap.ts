import express from "express";
import { Print } from "@adapters/print.adapter";

interface Options {
  SERVER_PORT: number;
  APP_ROUTER: express.Router;
}

export class Server {
  private app = express();
  private SERVER_PORT: number;
  private APP_ROUTER: express.Router;

  constructor({ SERVER_PORT, APP_ROUTER }: Options) {
    this.SERVER_PORT = SERVER_PORT;
    this.APP_ROUTER = APP_ROUTER;

    this.middlewares();
    this.routes();
  }

  routes() {
    this.app.use("/api", this.APP_ROUTER);
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  start = () => {
    this.app.listen(this.SERVER_PORT, () => {
      Print.success(`Server running in port ${this.SERVER_PORT}`);
    });
  };
}
