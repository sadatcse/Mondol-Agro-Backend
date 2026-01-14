// app/modules/EmployeeLeave/EmployeeLeave.controller.js

import EmployeeLeave from "./EmployeeLeave.model.js";

// Get all employee leaves
export async function getAllEmployeeLeaves(req, res) {
  try {
    const result = await EmployeeLeave.find().populate("employee");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get paginated employee leaves
export async function getPaginatedEmployeeLeaves(req, res) {
  try {
    const { page = 1, limit = 10, search = "", year, employeeId, leaveType, department } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // 1. Initial Match (Filters for fields physically on the Leave document)
    let matchQuery = {};
    if (year) {
      const startOfYear = new Date(`${year}-01-01`);
      const endOfYear = new Date(`${year}-12-31T23:59:59`);
      matchQuery.date = { $gte: startOfYear, $lte: endOfYear };
    }
    if (leaveType) matchQuery.leaveType = { $regex: leaveType, $options: "i" };
    if (employeeId && mongoose.Types.ObjectId.isValid(employeeId)) {
      matchQuery.employee = new mongoose.Types.ObjectId(employeeId);
    }

    let aggregate = [
      { $match: matchQuery },
      {
        $lookup: {
          from: "employees", 
          localField: "employee",
          foreignField: "_id",
          as: "employee"
        }
      },
      { $unwind: "$employee" }
    ];

    // 2. Secondary Match (Filters for fields inside the joined Employee object)
    let secondaryMatch = {};
    if (department) {
      secondaryMatch["employee.department"] = department;
    }
    
    // THIS IS THE FIX: Move search here to include employee name
    if (search) {
      secondaryMatch.$or = [
        { "employee.name": { $regex: search, $options: "i" } },
        { "employee.employeeId": { $regex: search, $options: "i" } },
        { leaveType: { $regex: search, $options: "i" } },
        { reason: { $regex: search, $options: "i" } }
      ];
    }

    if (Object.keys(secondaryMatch).length > 0) {
      aggregate.push({ $match: secondaryMatch });
    }

    // Execute Count and Data queries
    const totalDocs = await EmployeeLeave.aggregate([...aggregate, { $count: "count" }]);
    const totalItems = totalDocs.length > 0 ? totalDocs[0].count : 0;

    const result = await EmployeeLeave.aggregate([
      ...aggregate,
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: parseInt(limit) }
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

// Get employee leave by ID
export async function getEmployeeLeaveById(req, res) {
  const id = req.params.id;
  try {
    const result = await EmployeeLeave.findById(id).populate("employee");
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Employee leave not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new employee leave
export async function createEmployeeLeave(req, res) {
  try {
    const employeeLeaveData = req.body;
    const result = await EmployeeLeave.create(employeeLeaveData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update an employee leave by ID
export async function updateEmployeeLeave(req, res) {
  const id = req.params.id;
  const employeeLeaveData = req.body;
  try {
    const result = await EmployeeLeave.findByIdAndUpdate(id, employeeLeaveData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Employee leave not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove an employee leave by ID
export async function removeEmployeeLeave(req, res) {
  const id = req.params.id;
  try {
    const result = await EmployeeLeave.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Employee leave deleted successfully" });
    } else {
      res.status(404).json({ message: "Employee leave not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
