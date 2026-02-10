// app/modules/Warehouse/Warehouse.model.js

import mongoose from "mongoose";
const { Schema, model } = mongoose;

const WarehouseSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the warehouse name"],
    },
    code: {
      type: String,
      unique: true,
    },
    address: {
      type: String,
      required: [true, "Please provide the warehouse address"],
    },
    phone: {
      type: String,
      required: [true, "Please provide the warehouse phone number"],
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Please provide the company"],
    },
    manager: {
      type: String,
    },
  },
  { timestamps: true }
);

const Warehouse = model("Warehouse", WarehouseSchema);

export default Warehouse;
