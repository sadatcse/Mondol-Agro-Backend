// File: app/modules/EmployeeAdvance/EmployeeAdvance.model.js
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const EmployeeAdvanceSchema = Schema(
  {
    // --- Employee ---
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: [true, "Please provide the employee"],
    },

    // --- Advance Details ---
    amount: {
      type: Number,
      required: [true, "Please provide the advance amount"],
    },

    repaymentMonths: {
      type: Number,
      required: [true, "Please provide the repayment months"],
      min: 1,
      max: 24,
    },

    advanceDate: {
      type: Date,
      required: [true, "Please provide the advance date"],
    },

    reason: {
      type: String,
    },

    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const EmployeeAdvance = model("EmployeeAdvance", EmployeeAdvanceSchema);

export default EmployeeAdvance;
