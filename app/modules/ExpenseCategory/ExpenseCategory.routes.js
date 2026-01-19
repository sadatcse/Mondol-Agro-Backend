// app/modules/ExpenseCategory/ExpenseCategory.routes.js

import { Router } from "express";
import {
  createExpenseCategory,
  getAllExpenseCategories,
  getExpenseCategoryById,
  updateExpenseCategory,
  removeExpenseCategory,
  getPaginatedExpenseCategories,
} from "./ExpenseCategory.controller.js";

const ExpenseCategoryRoutes = Router();

// Get all expense categories
ExpenseCategoryRoutes.get("/", getAllExpenseCategories);

// Get expense category by ID
ExpenseCategoryRoutes.get("/get-id/:id", getExpenseCategoryById);

// Create a new expense category
ExpenseCategoryRoutes.post("/post", createExpenseCategory);

// Update an expense category by ID
ExpenseCategoryRoutes.put("/update/:id", updateExpenseCategory);

// Delete an expense category by ID
ExpenseCategoryRoutes.delete("/delete/:id", removeExpenseCategory);

// Get paginated expense categories
ExpenseCategoryRoutes.get("/paginate", getPaginatedExpenseCategories);

export default ExpenseCategoryRoutes;
