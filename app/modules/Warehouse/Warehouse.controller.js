// app/modules/Warehouse/Warehouse.controller.js

import Warehouse from "./Warehouse.model.js";

// Get all warehouses
export async function getAllWarehouses(req, res) {
  try {
    const result = await Warehouse.find().populate("company");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get paginated warehouses
export async function getPaginatedWarehouses(req, res) {
  try {
    const { page = 1, limit = 10, search = "", company = "" } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { code: { $regex: search, $options: "i" } },
      ];
    }

    if (company && company !== "all") {
      query.company = company;
    }

    const [result, totalItems] = await Promise.all([
      Warehouse.find(query)
        .populate("company")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Warehouse.countDocuments(query),
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

// Get warehouse by ID
export async function getWarehouseById(req, res) {
  const id = req.params.id;
  try {
    const result = await Warehouse.findById(id).populate("company");
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Warehouse not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new warehouse
export async function createWarehouse(req, res) {
  try {
    const warehouseData = req.body;
    const result = await Warehouse.create(warehouseData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a warehouse by ID
export async function updateWarehouse(req, res) {
  const id = req.params.id;
  const warehouseData = req.body;
  try {
    const result = await Warehouse.findByIdAndUpdate(id, warehouseData, { new: true });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Warehouse not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a warehouse by ID
export async function removeWarehouse(req, res) {
  const id = req.params.id;
  try {
    const result = await Warehouse.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Warehouse deleted successfully" });
    } else {
      res.status(404).json({ message: "Warehouse not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
