import mongoose, { Schema, Document, Types } from "mongoose";
import { ProjectCollectionName } from "./project.model";

const taskStatus = {
  PENDING: "PENDING",
  ON_HOLD: "ON_HOLD",
  IN_PROGRESS: "IN_PROGRESS",
  UNDER_REVIEW: "UNDER_REVIEW",
  COMPLETED: "COMPLETED",
} as const;

export type TaskStatus = (typeof taskStatus)[keyof typeof taskStatus];

export interface ITask extends Document {
  name: string;
  description: string;
  project: Types.ObjectId;
}

export const TaskSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    project: {
      type: Types.ObjectId,
      ref: ProjectCollectionName,
    },

    status: {
      type: String,
      required: true,
      enum: Object.values(taskStatus),
      default: taskStatus.PENDING,
    },
  },
  { timestamps: true },
);

export const TaskCollectionName = "Task";
export const Task = mongoose.model<ITask>(TaskCollectionName, TaskSchema);
