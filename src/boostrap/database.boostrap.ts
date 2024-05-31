import mongoose, { MongooseError } from "mongoose";
import { Print } from "@adapters/print.adapter";

interface Options {
  MONGO_URI: string;
}

export class Database {
  private MONGO_URI: string;

  constructor({ MONGO_URI }: Options) {
    this.MONGO_URI = MONGO_URI;
  }

  connect = async () => {
    try {
      await mongoose.connect(this.MONGO_URI);
      Print.success("Database connect success");
    } catch (error) {
      if (error instanceof MongooseError) {
        Print.error(error.message);
      }
      throw error;
    }
  };
}
