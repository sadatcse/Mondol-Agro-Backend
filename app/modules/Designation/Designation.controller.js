// app/modules/Designation/Designation.controller.js

import Designation from "./Designation.model.js";

// Get all designations
export async function getAllDesignations(req, res) {
  try {
    const result = await Designation.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get paginated designations
export async function getPaginatedDesignations(req, res) {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
      ];
    }

    const [result, totalItems] = await Promise.all([
      Designation.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Designation.countDocuments(query),
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

// Get designation by ID
export async function getDesignationById(req, res) {
  const id = req.params.id;
  try {
    const result = await Designation.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Designation not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new designation
export async function createDesignation(req, res) {
  try {
    const designationData = req.body;
    const result = await Designation.create(designationData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a designation by ID
export async function updateDesignation(req, res) {
  const id = req.params.id;
  const designationData = req.body;
  try {
    const result = await Designation.findByIdAndUpdate(id, designationData, { new: true });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Designation not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a designation by ID
export async function removeDesignation(req, res) {
  const id = req.params.id;
  try {
    const result = await Designation.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Designation deleted successfully" });
    } else {
      res.status(404).json({ message: "Designation not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
