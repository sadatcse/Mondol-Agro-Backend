// app/modules/Designation/Designation.routes.js

import { Router } from "express";
import {
  createDesignation,
  getAllDesignations,
  getDesignationById,
  updateDesignation,
  removeDesignation,
  getPaginatedDesignations,
} from "./Designation.controller.js";

const DesignationRoutes = Router();

// Get all designations
DesignationRoutes.get("/", getAllDesignations);

// Get designation by ID
DesignationRoutes.get("/get-id/:id", getDesignationById);

// Create a new designation
DesignationRoutes.post("/post", createDesignation);

// Update a designation by ID
DesignationRoutes.put("/update/:id", updateDesignation);

// Delete a designation by ID
DesignationRoutes.delete("/delete/:id", removeDesignation);

// Get paginated designations
DesignationRoutes.get("/paginate", getPaginatedDesignations);

export default DesignationRoutes;
