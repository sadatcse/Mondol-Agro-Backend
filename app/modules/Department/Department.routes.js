// app/modules/Department/Department.routes.js

import { Router } from "express";
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  removeDepartment,
  getPaginatedDepartments,
} from "./Department.controller.js";

const DepartmentRoutes = Router();

// Get all departments
DepartmentRoutes.get("/", getAllDepartments);

// Get department by ID
DepartmentRoutes.get("/get-id/:id", getDepartmentById);

// Create a new department
DepartmentRoutes.post("/post", createDepartment);

// Update a department by ID
DepartmentRoutes.put("/update/:id", updateDepartment);

// Delete a department by ID
DepartmentRoutes.delete("/delete/:id", removeDepartment);

// Get paginated departments
DepartmentRoutes.get("/paginate", getPaginatedDepartments);

export default DepartmentRoutes;
