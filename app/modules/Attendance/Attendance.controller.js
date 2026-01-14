// app/modules/Attendance/Attendance.controller.js

import Attendance from "./Attendance.model.js";

// Get all attendances
export async function getAllAttendances(req, res) {
  try {
    const result = await Attendance.find().populate("employee");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get paginated attendances
export async function getPaginatedAttendances(req, res) {
  try {
    const { page = 1, limit = 10, date, department, status } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let query = {};

    // 1. Date Filter
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      query.date = { $gte: start, $lte: end };
    }

    // 2. Department Filter
    if (department && department !== "All Departments") {
      query.department = department;
    }

    // 3. Status Filter (NEW)
    if (status && status !== "All Status") {
      query.status = status;
    }

    const [result, totalItems] = await Promise.all([
      Attendance.find(query)
        .populate("employee")
        .sort({ date: -1, createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Attendance.countDocuments(query),
    ]);

    res.status(200).json({
      data: result,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
      currentPage: parseInt(page),
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
// Get attendance by ID
export async function getAttendanceById(req, res) {
  const id = req.params.id;
  try {
    const result = await Attendance.findById(id).populate("employee");
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Attendance not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
export async function getAttendanceReport(req, res) {
  try {
    // 1. Add 'company' to destructuring
    const { month, year, department, employee, company } = req.query;

    if (!month || !year) {
      return res.status(400).json({ message: "Month and Year are required" });
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    let matchQuery = {
      date: { $gte: startDate, $lte: endDate },
    };

    const pipeline = [
      { $match: matchQuery },
      // Join with Employee to get company/department info
      {
        $lookup: {
          from: "employees",
          localField: "employee",
          foreignField: "_id",
          as: "employeeDetails",
        },
      },
      { $unwind: "$employeeDetails" },
    ];

    // --- NEW: Company Filter ---
    // This must happen after lookup/unwind because 'company' is inside employeeDetails
    if (company && company !== "All Companies") {
      pipeline.push({
        $match: {
          "employeeDetails.company": new mongoose.Types.ObjectId(company),
        },
      });
    }

    // Existing Department Filter
    if (department && department !== "All Departments") {
      pipeline.push({
        $match: { "employeeDetails.department": department },
      });
    }

    // Existing Specific Employee Filter
    if (employee && employee !== "All Employees") {
      pipeline.push({
        $match: {
          $or: [
            { "employeeDetails._id": new mongoose.Types.ObjectId(employee) },
          ],
        },
      });
    }

    pipeline.push({
      $group: {
        _id: "$employeeDetails._id",
        name: { $first: "$employeeDetails.name" },
        employeeId: { $first: "$employeeDetails.employeeId" },
        department: { $first: "$employeeDetails.department" },
        // We can capture company ID if needed for debugging, but not strictly necessary for display
        companyId: { $first: "$employeeDetails.company" }, 
        present: {
          $sum: { $cond: [{ $eq: ["$status", "Present"] }, 1, 0] },
        },
        absent: {
          $sum: { $cond: [{ $eq: ["$status", "Absent"] }, 1, 0] },
        },
        late: {
          $sum: { $cond: [{ $eq: ["$status", "Late"] }, 1, 0] },
        },
        halfDay: {
          $sum: { $cond: [{ $eq: ["$status", "Half Day"] }, 1, 0] },
        },
        leave: {
          $sum: { $cond: [{ $eq: ["$status", "On Leave"] }, 1, 0] },
        },
        holiday: {
          $sum: { $cond: [{ $eq: ["$status", "Holiday"] }, 1, 0] },
        },
        weekend: {
          $sum: { $cond: [{ $eq: ["$status", "Weekend"] }, 1, 0] },
        },
        totalRecords: { $sum: 1 },
      },
    });

    const reportData = await Attendance.aggregate(pipeline);

    // ... Calculation Logic (Same as before) ...
    const workingDays = reportData.length > 0 ? Math.max(...reportData.map(r => r.totalRecords - r.holiday - r.weekend)) : 26; 
    const totalEmployees = reportData.length;
    let totalPresent = 0;
    let totalAbsent = 0;
    let totalLate = 0;

    reportData.forEach((emp) => {
      totalPresent += emp.present;
      totalAbsent += emp.absent;
      totalLate += emp.late;
      const daysCounted = workingDays || 1;
      emp.attendanceRate = ((emp.present / daysCounted) * 100).toFixed(1);
    });

    const overallRate = totalEmployees > 0 
        ? ((totalPresent / (totalEmployees * workingDays)) * 100).toFixed(1) 
        : 0;

    res.status(200).json({
      summary: {
        totalEmployees,
        workingDays,
        attendanceRate: overallRate,
        present: totalPresent,
        absent: totalAbsent,
        late: totalLate,
      },
      tableData: reportData.sort((a, b) => a.name.localeCompare(b.name)),
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getTodaysLeaveCount(req, res) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Find all "On Leave" records for today
    const leaves = await Attendance.find({
      date: { $gte: today, $lt: tomorrow },
      status: "On Leave"
    }).select('employee');

    res.status(200).json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Create a new attendance
export async function createAttendance(req, res) {
  try {
    const attendanceData = {
        ...req.body,
        date: new Date(req.body.date)
    };
    const result = await Attendance.create(attendanceData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update an attendance by ID
export async function updateAttendance(req, res) {
  const id = req.params.id;
  const attendanceData = req.body;
  try {
    const result = await Attendance.findByIdAndUpdate(id, attendanceData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Attendance not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function bulkCreateAttendance(req, res) {
  try {
    const records = req.body; 
    if (!Array.isArray(records)) {
        return res.status(400).json({ message: "Payload must be an array" });
    }
    // Clean data and ensure date objects
    const formattedRecords = records.map(rec => ({
        ...rec,
        date: new Date(rec.date)
    }));
    
    const result = await Attendance.insertMany(formattedRecords);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove an attendance by ID
export async function removeAttendance(req, res) {
  const id = req.params.id;
  try {
    const result = await Attendance.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Attendance deleted successfully" });
    } else {
      res.status(404).json({ message: "Attendance not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
