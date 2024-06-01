import mongoose, { Schema, PopulatedDoc, Types } from "mongoose";
import { ITask, TaskCollectionName } from "./task.model";

export interface IProject extends Document {
  projectName: string;
  clientName: string;
  description: string;
  tasks: PopulatedDoc<ITask & Document>[];
}

export const ProjectSchema: Schema = new Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },

    clientName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    tasks: [
      {
        type: Types.ObjectId,
        ref: TaskCollectionName,
      },
    ],
  },
  { timestamps: true },
);

export const ProjectCollectionName = "Project";
export const Project = mongoose.model<IProject>(ProjectCollectionName, ProjectSchema);
