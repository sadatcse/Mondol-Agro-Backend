import { Router } from "express";
import {
  createVendor,
  getAllVendors,
  getVendorById,
  updateVendor,
  removeVendor,
  getPaginatedVendors,
  getVendorsByCity,
} from "./Vendor.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js";
const VendorRoutes = Router();

// Get all vendors
VendorRoutes.get("/", getAllVendors);

// Get vendors by city
VendorRoutes.get("/:city/get-all", getVendorsByCity);

// Get vendor by ID
VendorRoutes.get("/get-id/:id", getVendorById);

// Create a new vendor
VendorRoutes.post("/post", createVendor);

// Update a vendor by ID
VendorRoutes.put("/update/:id", updateVendor);

// Delete a vendor by ID
VendorRoutes.delete("/delete/:id", removeVendor);

// Get paginated vendors
VendorRoutes.get("/paginate", getPaginatedVendors);

export default VendorRoutes;
