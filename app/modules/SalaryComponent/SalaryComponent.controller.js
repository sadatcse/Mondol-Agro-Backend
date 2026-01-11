// app/modules/SalaryComponent/SalaryComponent.controller.js

import SalaryComponent from "./SalaryComponent.model.js";

// Get all salary components
export async function getAllSalaryComponents(req, res) {
  try {
    const result = await SalaryComponent.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get paginated salary components
export async function getPaginatedSalaryComponents(req, res) {
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
      SalaryComponent.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      SalaryComponent.countDocuments(query),
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

// Get salary component by ID
export async function getSalaryComponentById(req, res) {
  const id = req.params.id;
  try {
    const result = await SalaryComponent.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Salary component not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new salary component
export async function createSalaryComponent(req, res) {
  try {
    const salaryComponentData = req.body;
    const result = await SalaryComponent.create(salaryComponentData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a salary component by ID
export async function updateSalaryComponent(req, res) {
  const id = req.params.id;
  const salaryComponentData = req.body;
  try {
    const result = await SalaryComponent.findByIdAndUpdate(id, salaryComponentData, { new: true });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Salary component not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a salary component by ID
export async function removeSalaryComponent(req, res) {
  const id = req.params.id;
  try {
    const result = await SalaryComponent.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Salary component deleted successfully" });
    } else {
      res.status(404).json({ message: "Salary component not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
