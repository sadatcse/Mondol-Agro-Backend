// app/modules/Timesheet/Timesheet.controller.js

import Timesheet from "./Timesheet.model.js";

// Get paginated & filtered timesheets
export async function getPaginatedTimesheets(req, res) {
  try {
    const {
      page = 1,
      limit = 10,
      employeeId = "",
      employeeEmail = "",
      remarksEmail = "",
      startDate = "",
      endDate = "",
      status = "",
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    let query = {};

    // Filter by Employee MongoDB ID
    if (employeeId) {
      query.employee = employeeId;
    }

    // Filter by Employee Email
    if (employeeEmail) {
      query.employeeEmail = employeeEmail;
    }

    // Filter by Approver Email
    if (remarksEmail) {
      query.remarksEmail = remarksEmail;
    }

    // Filter by Status
    if (status) {
      query.status = status;
    }

    // Filter by Date Range
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const [result, totalItems] = await Promise.all([
      Timesheet.find(query)
        .populate({
          path: "employee",
          select: `
            name
            employeeId
            employeePhoto
            department
            designation
            employeeEmail
            employeePhone
            status
            createdAt
          `
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),

      Timesheet.countDocuments(query),
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

// Get timesheet by ID
export async function getTimesheetById(req, res) {
  const id = req.params.id;
  try {
    const result = await Timesheet.findById(id).populate("employee");
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Timesheet not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new timesheet
export async function createTimesheet(req, res) {
  try {
    const timesheetData = req.body;
    const result = await Timesheet.create(timesheetData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a timesheet by ID
export async function updateTimesheet(req, res) {
  const id = req.params.id;
  const timesheetData = req.body;
  try {
    const result = await Timesheet.findByIdAndUpdate(id, timesheetData, { new: true });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Timesheet not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a timesheet by ID
export async function removeTimesheet(req, res) {
  const id = req.params.id;
  try {
    const result = await Timesheet.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Timesheet deleted successfully" });
    } else {
      res.status(404).json({ message: "Timesheet not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
