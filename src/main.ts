import "reflect-metadata";
import { Database } from "@boostrap/database.boostrap";
import { Server } from "@boostrap/server.bootrap";
import { Env } from "@adapters/env.adapter";
import { AppRouter } from "@routers/app-router.router";

async function main() {
  const database = new Database({
    MONGO_URI: Env.MONGO_URI,
  });

  const server = new Server({
    SERVER_PORT: Env.SERVER_PORT,
    APP_ROUTER: AppRouter.router,
  });

  await database.connect();
  server.start();
}

main();
