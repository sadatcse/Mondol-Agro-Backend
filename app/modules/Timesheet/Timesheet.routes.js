// app/modules/Timesheet/Timesheet.routes.js

import { Router } from "express";
import {
  createTimesheet,
  getTimesheetById,
  updateTimesheet,
  removeTimesheet,
  getPaginatedTimesheets,
} from "./Timesheet.controller.js";

const TimesheetRoutes = Router();

// Get all timesheets (with filters)
TimesheetRoutes.get("/", getPaginatedTimesheets);

// Get timesheet by ID
TimesheetRoutes.get("/get-id/:id", getTimesheetById);

// Create a new timesheet
TimesheetRoutes.post("/post", createTimesheet);

// Update a timesheet by ID
TimesheetRoutes.put("/update/:id", updateTimesheet);

// Delete a timesheet by ID
TimesheetRoutes.delete("/delete/:id", removeTimesheet);

export default TimesheetRoutes;
