import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ProjectSchema = Schema(
  {
    // --- Company & Client ---
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Please provide the company"],
    },

    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: [true, "Please provide the client"],
    },

    // --- Basic Project Info ---
    projectCode: {
      type: String,
      unique: true,
      trim: true,
    },

    projectName: {
      type: String,
      required: [true, "Please provide the project name"],
      trim: true,
    },

    projectType: {
      type: String,
      enum: ["Fixed Price", "Hourly", "Retainer", "Internal", "Maintenance"],
      default: "Fixed Price",
    },

    description: {
      type: String,
      trim: true,
    },

    // --- Timeline ---
    startDate: {
      type: Date,
      required: [true, "Please provide the start date"],
    },

    endDate: {
      type: Date,
    },

    estimatedDurationDays: {
      type: Number,
    },

    // --- Budget & Financial ---
    currency: {
      type: String,
      default: "BDT",
    },

    estimatedBudget: {
      type: Number,
      default: 0,
    },

    actualCost: {
      type: Number,
      default: 0,
    },

    hourlyRate: {
      type: Number,
      default: 0,
    },

    // --- Project Status ---
    status: {
      type: String,
      enum: ["Planned", "In Progress", "On Hold", "Completed", "Cancelled"],
      default: "Planned",
    },

    progressPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },

    // --- Team & Responsibility ---
    projectManager: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },

    assignedEmployees: [
      {
        type: Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],

    // --- Payment & Billing ---
    billingStatus: {
      type: String,
      enum: ["Unbilled", "Partially Billed", "Fully Billed"],
      default: "Unbilled",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Partial Paid", "Paid"],
      default: "Pending",
    },

    // --- Risk & Notes ---
    risks: {
      type: String,
    },

    notes: {
      type: String,
    },

    // --- Soft Delete ---
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Project = model("Project", ProjectSchema);

export default Project;
