// app/modules/Leave/Leave.model.js

import mongoose from "mongoose";
const { Schema, model } = mongoose;

const LeaveSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the leave name"],
    },
    code: {
      type: String,
      unique: true,
    },
    daysPerYear: {
      type: Number,
      required: [true, "Please provide days per year"],
    },
    description: {
      type: String,
    },
    paidLeave: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Inactive",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

const Leave = model("Leave", LeaveSchema);

export default Leave;
