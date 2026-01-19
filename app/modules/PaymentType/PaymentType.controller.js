// app/modules/PaymentType/PaymentType.controller.js

import PaymentType from "./PaymentType.model.js";

// Get all payment types
export async function getAllPaymentTypes(req, res) {
  try {
    const result = await PaymentType.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get paginated payment types
export async function getPaginatedPaymentTypes(req, res) {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { refName: { $regex: search, $options: "i" } },
        { payeeName: { $regex: search, $options: "i" } },
      ];
    }

    const [result, totalItems] = await Promise.all([
      PaymentType.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      PaymentType.countDocuments(query),
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

// Get payment type by ID
export async function getPaymentTypeById(req, res) {
  const id = req.params.id;
  try {
    const result = await PaymentType.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Payment type not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new payment type
export async function createPaymentType(req, res) {
  try {
    const paymentTypeData = req.body;
    const result = await PaymentType.create(paymentTypeData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a payment type by ID
export async function updatePaymentType(req, res) {
  const id = req.params.id;
  const paymentTypeData = req.body;
  try {
    const result = await PaymentType.findByIdAndUpdate(id, paymentTypeData, { new: true });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Payment type not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a payment type by ID
export async function removePaymentType(req, res) {
  const id = req.params.id;
  try {
    const result = await PaymentType.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Payment type deleted successfully" });
    } else {
      res.status(404).json({ message: "Payment type not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
