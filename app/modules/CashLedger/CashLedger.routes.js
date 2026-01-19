// app/modules/CashLedger/CashLedger.routes.js

import { Router } from "express";
import {
  createCashLedger,
  getAllCashLedgers,
  getCashLedgerById,
  updateCashLedger,
  removeCashLedger,
  getPaginatedCashLedgers,
  getCompanyCashFlow,
  getAllCompanyBalanceSheet,
} from "./CashLedger.controller.js";

const CashLedgerRoutes = Router();

// Get all cash ledgers
CashLedgerRoutes.get("/", getAllCashLedgers);

// Get cash ledger by ID
CashLedgerRoutes.get("/get-id/:id", getCashLedgerById);

// Create a new cash ledger entry
CashLedgerRoutes.post("/post", createCashLedger);

// Update a cash ledger entry by ID
CashLedgerRoutes.put("/update/:id", updateCashLedger);

// Delete a cash ledger entry by ID
CashLedgerRoutes.delete("/delete/:id", removeCashLedger);

// Get paginated cash ledgers
CashLedgerRoutes.get("/paginate", getPaginatedCashLedgers);

// Get company cash flow
CashLedgerRoutes.get("/company-cashflow", getCompanyCashFlow);

// Get all company balance sheet
CashLedgerRoutes.get("/company-balance-sheet", getAllCompanyBalanceSheet);

export default CashLedgerRoutes;
