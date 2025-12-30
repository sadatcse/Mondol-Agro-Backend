import { Router } from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  removeEmployee,
  getPaginatedEmployees,
  getEmployeesByCity,
} from "./Employee.controller.js";

const EmployeeRoutes = Router();

// Get all employees
EmployeeRoutes.get("/", getAllEmployees);

// Get employees by city
EmployeeRoutes.get("/:city/get-all", getEmployeesByCity);

// Get employee by ID
EmployeeRoutes.get("/get-id/:id", getEmployeeById);

// Create a new employee
EmployeeRoutes.post("/post", createEmployee);

// Update an employee by ID
EmployeeRoutes.put("/update/:id", updateEmployee);

// Delete an employee by ID
EmployeeRoutes.delete("/delete/:id", removeEmployee);

// Get paginated employees
EmployeeRoutes.get("/paginate", getPaginatedEmployees);

export default EmployeeRoutes;