// app/modules/EmployeeLeave/EmployeeLeave.routes.js

import { Router } from "express";
import {
  createEmployeeLeave,
  getAllEmployeeLeaves,
  getEmployeeLeaveById,
  updateEmployeeLeave,
  removeEmployeeLeave,
  getPaginatedEmployeeLeaves,
} from "./EmployeeLeave.controller.js";

const EmployeeLeaveRoutes = Router();

// Get all employee leaves
EmployeeLeaveRoutes.get("/", getAllEmployeeLeaves);

// Get employee leave by ID
EmployeeLeaveRoutes.get("/get-id/:id", getEmployeeLeaveById);

// Create a new employee leave
EmployeeLeaveRoutes.post("/post", createEmployeeLeave);

// Update an employee leave by ID
EmployeeLeaveRoutes.put("/update/:id", updateEmployeeLeave);

// Delete an employee leave by ID
EmployeeLeaveRoutes.delete("/delete/:id", removeEmployeeLeave);

// Get paginated employee leaves
EmployeeLeaveRoutes.get("/paginate", getPaginatedEmployeeLeaves);

export default EmployeeLeaveRoutes;
