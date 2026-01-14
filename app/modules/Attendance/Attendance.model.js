// app/modules/Attendance/Attendance.model.js

import mongoose from "mongoose";
const { Schema, model } = mongoose;

const AttendanceSchema = Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: [true, "Please provide the employee"],
    },
    department: {
      type: String,
      required: [true, "Please provide the department"],
    },
    date: {
      type: Date,
      required: [true, "Please provide the date"],
    },
    status: {
      type: String,
      enum: [
        "Present",
        "Absent",
        "Late",
        "Half Day",
        "On Leave",
        "Holiday",
        "Weekend",
      ],
      required: [true, "Please provide the attendance status"],
    },
    checkIn: {
      type: String,
    },
    checkOut: {
      type: String,
    },
    overtimeHours: {
      type: Number,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

const Attendance = model("Attendance", AttendanceSchema);

export default Attendance;
