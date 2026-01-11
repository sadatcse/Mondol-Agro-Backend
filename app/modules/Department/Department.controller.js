// app/modules/Department/Department.controller.js

import Department from "./Department.model.js";

// Get all departments
export async function getAllDepartments(req, res) {
  try {
    const result = await Department.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get paginated departments
export async function getPaginatedDepartments(req, res) {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { code: { $regex: search, $options: "i" } },
      ];
    }

    const [result, totalItems] = await Promise.all([
      Department.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Department.countDocuments(query),
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

// Get department by ID
export async function getDepartmentById(req, res) {
  const id = req.params.id;
  try {
    const result = await Department.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Department not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new department
export async function createDepartment(req, res) {
  try {
    const departmentData = req.body;
    const result = await Department.create(departmentData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a department by ID
export async function updateDepartment(req, res) {
  const id = req.params.id;
  const departmentData = req.body;
  try {
    const result = await Department.findByIdAndUpdate(id, departmentData, { new: true });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Department not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a department by ID
export async function removeDepartment(req, res) {
  const id = req.params.id;
  try {
    const result = await Department.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Department deleted successfully" });
    } else {
      res.status(404).json({ message: "Department not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
