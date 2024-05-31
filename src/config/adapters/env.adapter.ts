import "dotenv/config";
import { get } from "env-var";

export class Env {
  public static get SERVER_PORT(): number {
    return get("SERVER_PORT").required().asPortNumber();
  }

  public static get MONGO_URI(): string {
    return get("MONGO_URI").required().asString();
  }
}
