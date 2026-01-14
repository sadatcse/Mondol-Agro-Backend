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
      required: [true, "Please provide the salary component code"],
    },

    type: {
      type: String,
      enum: ["Earnings", "Deductions"],
      required: [true, "Please provide the salary component type"],
    },

    calculationType: {
      type: String,
      enum: ["Fixed", "Percentage"],
      required: [true, "Please provide the calculation type"],
    },

    defaultAmount: {
      type: Number,
      required: [true, "Please provide the default amount"],
    },

    taxable: {
      type: Boolean,
      default: false, // false = inactive, true = active
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const SalaryComponent = model("SalaryComponent", SalaryComponentSchema);

export default SalaryComponent;
