import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 5000,
    },
    skills: { type: [String], required: true, index: true },
    budgetMin: { type: Number, required: true },
    budgetMax: { type: Number, required: true },
    type: {
      type: String,
      enum: ["web", "mobile", "design", "writing", "data", "other"],
      required: true,
      index: true,
      default: "other",
    },
    status: {
      type: String,
      enum: ["open", "in progress", "completed", "closed"], 
      default: "open",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model("Project", projectSchema);
