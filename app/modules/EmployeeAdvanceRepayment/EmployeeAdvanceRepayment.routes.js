// File: app/modules/EmployeeAdvanceRepayment/EmployeeAdvanceRepayment.routes.js
import { Router } from "express";
import {
  createEmployeeAdvanceRepayment,
  getAllEmployeeAdvanceRepayments,
  getEmployeeAdvanceRepaymentById,
  updateEmployeeAdvanceRepayment,
  removeEmployeeAdvanceRepayment,
  getPaginatedEmployeeAdvanceRepayments,
  getEmployeeAdvanceRepaymentsByEmployee,
} from "./EmployeeAdvanceRepayment.controller.js";

const EmployeeAdvanceRepaymentRoutes = Router();

// Get all repayments
EmployeeAdvanceRepaymentRoutes.get(
  "/",
  getAllEmployeeAdvanceRepayments
);

// Get repayments by employee
EmployeeAdvanceRepaymentRoutes.get(
  "/:employee/get-all",
  getEmployeeAdvanceRepaymentsByEmployee
);

// Get repayment by ID
EmployeeAdvanceRepaymentRoutes.get(
  "/get-id/:id",
  getEmployeeAdvanceRepaymentById
);

// Create a new repayment
EmployeeAdvanceRepaymentRoutes.post(
  "/post",
  createEmployeeAdvanceRepayment
);

// Update a repayment by ID
EmployeeAdvanceRepaymentRoutes.put(
  "/update/:id",
  updateEmployeeAdvanceRepayment
);

// Delete a repayment by ID
EmployeeAdvanceRepaymentRoutes.delete(
  "/delete/:id",
  removeEmployeeAdvanceRepayment
);

// Get paginated repayments
EmployeeAdvanceRepaymentRoutes.get(
  "/paginate",
  getPaginatedEmployeeAdvanceRepayments
);

export default EmployeeAdvanceRepaymentRoutes;
