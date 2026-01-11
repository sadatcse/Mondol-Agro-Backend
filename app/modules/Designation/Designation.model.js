// app/modules/Designation/Designation.model.js

import mongoose from "mongoose";
const { Schema, model } = mongoose;

const DesignationSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the designation name"],
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

const Designation = model("Designation", DesignationSchema);

export default Designation;
