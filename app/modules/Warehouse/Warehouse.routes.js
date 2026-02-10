// app/modules/Warehouse/Warehouse.routes.js

import { Router } from "express";
import {
  createWarehouse,
  getAllWarehouses,
  getWarehouseById,
  updateWarehouse,
  removeWarehouse,
  getPaginatedWarehouses,
} from "./Warehouse.controller.js";

const WarehouseRoutes = Router();

// Get all warehouses
WarehouseRoutes.get("/", getAllWarehouses);

// Get warehouse by ID
WarehouseRoutes.get("/get-id/:id", getWarehouseById);

// Create a new warehouse
WarehouseRoutes.post("/post", createWarehouse);

// Update a warehouse by ID
WarehouseRoutes.put("/update/:id", updateWarehouse);

// Delete a warehouse by ID
WarehouseRoutes.delete("/delete/:id", removeWarehouse);

// Get paginated warehouses
WarehouseRoutes.get("/paginate", getPaginatedWarehouses);

export default WarehouseRoutes;
