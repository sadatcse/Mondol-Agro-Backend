// File: app/modules/EmployeeAdvanceRepayment/EmployeeAdvanceRepayment.controller.js
import EmployeeAdvanceRepayment from "./EmployeeAdvanceRepayment.model.js";

// Get all repayments
export async function getAllEmployeeAdvanceRepayments(req, res) {
  try {
    const result = await EmployeeAdvanceRepayment.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get repayments by employee
export async function getEmployeeAdvanceRepaymentsByEmployee(req, res) {
  const employee = req.params.employee;
  try {
    const result = await EmployeeAdvanceRepayment.find({ employee });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getPaginatedEmployeeAdvanceRepayments(req, res) {
  try {
    const { page = 1, limit = 10, search = "", employee = "" } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let query = {};

    // Search by status logic
    if (search) {
      query.$or = [
        { status: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by Employee ID (if provided and not empty)
    if (employee && employee !== "all") {
      query.employee = employee;
    }

    const [result, totalItems] = await Promise.all([
      EmployeeAdvanceRepayment.find(query)
        .populate("employee")
        .populate("employeeAdvance")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      EmployeeAdvanceRepayment.countDocuments(query),
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

// Get repayment by ID
export async function getEmployeeAdvanceRepaymentById(req, res) {
  const id = req.params.id;
  try {
    const result = await EmployeeAdvanceRepayment.findById(id)
      .populate("employee")
      .populate("employeeAdvance");

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Employee advance repayment not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new repayment
export async function createEmployeeAdvanceRepayment(req, res) {
  try {
    const repaymentData = req.body;
    const result = await EmployeeAdvanceRepayment.create(repaymentData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a repayment by ID
export async function updateEmployeeAdvanceRepayment(req, res) {
  const id = req.params.id;
  const repaymentData = req.body;
  try {
    const result = await EmployeeAdvanceRepayment.findByIdAndUpdate(
      id,
      repaymentData,
      { new: true }
    );
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Employee advance repayment not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a repayment by ID
export async function removeEmployeeAdvanceRepayment(req, res) {
  const id = req.params.id;
  try {
    const result = await EmployeeAdvanceRepayment.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({
        message: "Employee advance repayment deleted successfully",
      });
    } else {
      res.status(404).json({ message: "Employee advance repayment not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
