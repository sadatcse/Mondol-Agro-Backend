// app/modules/SalaryComponent/SalaryComponent.routes.js

import { Router } from "express";
import {
  createSalaryComponent,
  getAllSalaryComponents,
  getSalaryComponentById,
  updateSalaryComponent,
  removeSalaryComponent,
  getPaginatedSalaryComponents,
} from "./SalaryComponent.controller.js";

const SalaryComponentRoutes = Router();

// Get all salary components
SalaryComponentRoutes.get("/", getAllSalaryComponents);

// Get salary component by ID
SalaryComponentRoutes.get("/get-id/:id", getSalaryComponentById);

// Create a new salary component
SalaryComponentRoutes.post("/post", createSalaryComponent);

// Update a salary component by ID
SalaryComponentRoutes.put("/update/:id", updateSalaryComponent);

// Delete a salary component by ID
SalaryComponentRoutes.delete("/delete/:id", removeSalaryComponent);

// Get paginated salary components
SalaryComponentRoutes.get("/paginate", getPaginatedSalaryComponents);

export default SalaryComponentRoutes;
