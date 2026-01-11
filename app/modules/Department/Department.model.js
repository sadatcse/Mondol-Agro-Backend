// app/modules/Department/Department.model.js

import mongoose from "mongoose";
const { Schema, model } = mongoose;

const DepartmentSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the department name"],
    },
    code: {
      type: String,
      unique: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

const Department = model("Department", DepartmentSchema);

export default Department;
