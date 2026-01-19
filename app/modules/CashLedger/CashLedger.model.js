// app/modules/CashLedger/CashLedger.model.js

import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CashLedgerSchema = Schema(
  {
    companyName: {
      type: String,
      required: [true, "Please provide the company name"],
    },
    payment: {
      name: {
        type: String,
        required: [true, "Please provide payment name"],
      },
      refName: {
        type: String,
        required: [true, "Please provide payment reference name"],
      },
      payeeName: {
        type: String,
        required: [true, "Please provide payee name"],
      },
    },
    cashInOrOut: {
      type: String,
      enum: ["cash-in", "cash-out"],
      required: [true, "Please specify cash in or cash out"],
    },
    amount: {
      type: Number,
      required: [true, "Please provide transaction amount"],
    },
    createdBy: {
      name: {
        type: String,
        required: [true, "Please provide creator name"],
      },
      email: {
        type: String,
        required: [true, "Please provide creator email"],
      },
      company: {
        type: String,
        required: [true, "Please provide creator company"],
      },
    },
    transactionDateTime: {
      type: Date,
      required: [true, "Please provide transaction date and time"],
    },
    oldBalance: {
      type: Number,
      required: [true, "Please provide old balance"],
    },
    currentBalance: {
      type: Number,
      required: [true, "Please provide current balance"],
    },
    purpose: {
      type: String,
    },
  },
  { timestamps: true }
);

const CashLedger = model("CashLedger", CashLedgerSchema);

export default CashLedger;
