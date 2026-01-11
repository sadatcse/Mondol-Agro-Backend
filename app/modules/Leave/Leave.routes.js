// app/modules/Leave/Leave.routes.js

import { Router } from "express";
import {
  createLeave,
  getAllLeaves,
  getLeaveById,
  updateLeave,
  removeLeave,
  getPaginatedLeaves,
} from "./Leave.controller.js";

const LeaveRoutes = Router();

// Get all leaves
LeaveRoutes.get("/", getAllLeaves);

// Get leave by ID
LeaveRoutes.get("/get-id/:id", getLeaveById);

// Create a new leave
LeaveRoutes.post("/post", createLeave);

// Update a leave by ID
LeaveRoutes.put("/update/:id", updateLeave);

// Delete a leave by ID
LeaveRoutes.delete("/delete/:id", removeLeave);

// Get paginated leaves
LeaveRoutes.get("/paginate", getPaginatedLeaves);

export default LeaveRoutes;
