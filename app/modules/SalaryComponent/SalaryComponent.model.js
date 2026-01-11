// app/modules/SalaryComponent/SalaryComponent.model.js

import mongoose from "mongoose";
const { Schema, model } = mongoose;

const SalaryComponentSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the salary component name"],
    },
    code: {
      type: String,
      unique: true,
    },
    type: {
      type: String,
      enum: ["Earnings", "Deductions"],
      required: [true, "Please provide the salary component type"],
    },
  },
  { timestamps: true }
);

const SalaryComponent = model("SalaryComponent", SalaryComponentSchema);

export default SalaryComponent;
