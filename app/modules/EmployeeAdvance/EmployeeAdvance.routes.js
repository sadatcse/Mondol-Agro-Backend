// File: app/modules/EmployeeAdvance/EmployeeAdvance.routes.js
import { Router } from "express";
import {
  createEmployeeAdvance,
  getAllEmployeeAdvances,
  getEmployeeAdvanceById,
  updateEmployeeAdvance,
  removeEmployeeAdvance,
  getPaginatedEmployeeAdvances,
  getEmployeeAdvancesByEmployee,
} from "./EmployeeAdvance.controller.js";

const EmployeeAdvanceRoutes = Router();

// Get all advances
EmployeeAdvanceRoutes.get("/", getAllEmployeeAdvances);

// Get advances by employee
EmployeeAdvanceRoutes.get("/:employee/get-all", getEmployeeAdvancesByEmployee);

// Get advance by ID
EmployeeAdvanceRoutes.get("/get-id/:id", getEmployeeAdvanceById);

// Create a new advance
EmployeeAdvanceRoutes.post("/post", createEmployeeAdvance);

// Update an advance by ID
EmployeeAdvanceRoutes.put("/update/:id", updateEmployeeAdvance);

// Delete an advance by ID
EmployeeAdvanceRoutes.delete("/delete/:id", removeEmployeeAdvance);

// Get paginated advances
EmployeeAdvanceRoutes.get("/paginate", getPaginatedEmployeeAdvances);

export default EmployeeAdvanceRoutes;
