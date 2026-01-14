// app/modules/Timesheet/Timesheet.model.js

import mongoose from "mongoose";
const { Schema, model } = mongoose;

const TimesheetSchema = Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: [true, "Please provide the employee"],
    },
    employeeEmail: {
      type: String,
      required: [true, "Please provide the employee email"],
    },
    employeeName: {
      type: String,
      required: [true, "Please provide the employee name"],
    },
    date: {
      type: Date,
      required: [true, "Please provide the date"],
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Draft", "Submit"],
      default: "Draft",
    },
    remarksDescription: {
      type: String,
    },
    remarksEmail: {
      type: String,
    },
    remarksName: {
      type: String,
    },
    timesheetApprovedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Timesheet = model("Timesheet", TimesheetSchema);

export default Timesheet;
