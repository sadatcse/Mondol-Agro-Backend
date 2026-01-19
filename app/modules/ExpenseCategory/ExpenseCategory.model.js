// app/modules/ExpenseCategory/ExpenseCategory.model.js

import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ExpenseCategorySchema = Schema(
  {
    categoryName: {
      type: String,
      required: [true, "Please provide the expense category name"],
    },
  },
  { timestamps: true }
);

const ExpenseCategory = model("ExpenseCategory", ExpenseCategorySchema);

export default ExpenseCategory;
