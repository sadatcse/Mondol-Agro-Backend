// app/modules/EmployeeLeave/EmployeeLeave.model.js

import mongoose from "mongoose";
const { Schema, model } = mongoose;

const EmployeeLeaveSchema = Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: [true, "Please provide the employee"],
    },
    leaveType: {
      type: String,
      required: [true, "Please provide the leave type"],
    },
    date: {
      type: Date,
      required: [true, "Please provide the date"],
    },
    period: {
      type: String,
      required: [true, "Please provide the leave period"],
    },
    days: {
      type: Number,
      required: [true, "Please provide number of days"],
    },
    reason: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

const EmployeeLeave = model("EmployeeLeave", EmployeeLeaveSchema);

export default EmployeeLeave;
