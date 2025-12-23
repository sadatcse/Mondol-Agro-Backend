import mongoose from "mongoose";
const { Schema, model } = mongoose;

const DocumentSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the document name"],
    },
    link: {
      type: String,
      required: [true, "Please provide the document link"],
    },
  },
  { _id: false }
);

const ProjectSchema = Schema(
  {
    projectId: {
      type: String,
      required: [true, "Please provide the project ID"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please provide the project name"],
    },
    address: {
      type: String,
      required: [true, "Please provide the project address"],
    },
    description: {
      type: String,
      required: [true, "Please provide the project description"],
    },
    projectManager: {
      type: String,
      required: [true, "Please provide the project manager"],
    },
    startDate: {
      type: Date,
      required: [true, "Please provide the start date"],
    },
    endDate: {
      type: Date,
      required: [true, "Please provide the end date"],
    },
    documents: {
      type: [DocumentSchema],
      default: [],
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

const Project = model("Project", ProjectSchema);

export default Project;
