// app/modules/Leave/Leave.controller.js

import Leave from "./Leave.model.js";

// Get all leaves
export async function getAllLeaves(req, res) {
  try {
    const result = await Leave.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get paginated leaves
export async function getPaginatedLeaves(req, res) {
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
      Leave.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Leave.countDocuments(query),
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

// Get leave by ID
export async function getLeaveById(req, res) {
  const id = req.params.id;
  try {
    const result = await Leave.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Leave not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new leave
export async function createLeave(req, res) {
  try {
    const leaveData = req.body;
    const result = await Leave.create(leaveData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a leave by ID
export async function updateLeave(req, res) {
  const id = req.params.id;
  const leaveData = req.body;
  try {
    const result = await Leave.findByIdAndUpdate(id, leaveData, { new: true });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Leave not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a leave by ID
export async function removeLeave(req, res) {
  const id = req.params.id;
  try {
    const result = await Leave.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Leave deleted successfully" });
    } else {
      res.status(404).json({ message: "Leave not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
