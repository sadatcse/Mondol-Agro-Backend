// app/modules/PaymentType/PaymentType.routes.js

import { Router } from "express";
import {
  createPaymentType,
  getAllPaymentTypes,
  getPaymentTypeById,
  updatePaymentType,
  removePaymentType,
  getPaginatedPaymentTypes,
} from "./PaymentType.controller.js";

const PaymentTypeRoutes = Router();

// Get all payment types
PaymentTypeRoutes.get("/", getAllPaymentTypes);

// Get payment type by ID
PaymentTypeRoutes.get("/get-id/:id", getPaymentTypeById);

// Create a new payment type
PaymentTypeRoutes.post("/post", createPaymentType);

// Update a payment type by ID
PaymentTypeRoutes.put("/update/:id", updatePaymentType);

// Delete a payment type by ID
PaymentTypeRoutes.delete("/delete/:id", removePaymentType);

// Get paginated payment types
PaymentTypeRoutes.get("/paginate", getPaginatedPaymentTypes);

export default PaymentTypeRoutes;
