// app/modules/PaymentType/PaymentType.model.js

import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PaymentTypeSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the payment type name"],
    },
    refName: {
      type: String,
      required: [true, "Please provide the reference name"],
    },
    payeeName: {
      type: String,
      required: [true, "Please provide the payee name"],
    },
  },
  { timestamps: true }
);

const PaymentType = model("PaymentType", PaymentTypeSchema);

export default PaymentType;
