// File: app/modules/EmployeeAdvanceRepayment/EmployeeAdvanceRepayment.model.js
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const EmployeeAdvanceRepaymentSchema = Schema(
  {
    // --- Reference ---
    employeeAdvance: {
      type: Schema.Types.ObjectId,
      ref: "EmployeeAdvance",
      required: [true, "Please provide the employee advance"],
    },

    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: [true, "Please provide the employee"],
    },

    // --- Schedule Details ---
    monthNumber: {
      type: Number,
      required: [true, "Please provide the month number"],
    },

    dueDate: {
      type: Date,
      required: [true, "Please provide the due date"],
    },

    installmentAmount: {
      type: Number,
      required: [true, "Please provide the installment amount"],
    },

    paidAmount: {
      type: Number,
      default: 0,
    },

    paymentDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["Pending", "Paid", "Overdue"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const EmployeeAdvanceRepayment = model(
  "EmployeeAdvanceRepayment",
  EmployeeAdvanceRepaymentSchema
);

export default EmployeeAdvanceRepayment;
