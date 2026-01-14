// app/modules/Attendance/Attendance.routes.js

import { Router } from "express";
import {
  createAttendance,
  getAllAttendances,
  getAttendanceById,
  updateAttendance,
  removeAttendance,
  bulkCreateAttendance,
  getAttendanceReport,
  getPaginatedAttendances,
  getTodaysLeaveCount,
} from "./Attendance.controller.js";

const AttendanceRoutes = Router();

// Get all attendances
AttendanceRoutes.get("/", getAllAttendances);
AttendanceRoutes.post("/bulk", bulkCreateAttendance);

// Get attendance by ID
AttendanceRoutes.get("/get-id/:id", getAttendanceById);

// Create a new attendance
AttendanceRoutes.post("/post", createAttendance);

// Update an attendance by ID
AttendanceRoutes.put("/update/:id", updateAttendance);

// Delete an attendance by ID
AttendanceRoutes.delete("/delete/:id", removeAttendance);

// Get paginated attendances
AttendanceRoutes.get("/paginate", getPaginatedAttendances);

AttendanceRoutes.get("/todays-leaves", getTodaysLeaveCount);

AttendanceRoutes.get("/report", getAttendanceReport);


export default AttendanceRoutes;
