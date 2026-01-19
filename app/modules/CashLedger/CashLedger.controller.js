// app/modules/CashLedger/CashLedger.controller.js

import CashLedger from "./CashLedger.model.js";

// Get all cash ledgers
export async function getAllCashLedgers(req, res) {
  try {
    const result = await CashLedger.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get paginated cash ledgers with filters
export async function getPaginatedCashLedgers(req, res) {
  try {
    const {
      page = 1,
      limit = 10,
      companyName = "",
      paymentName = "",
      createdName = "",
      createdCompany = "",
      startDate = "",
      endDate = "",
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    let query = {};

    if (companyName) {
      query.companyName = { $regex: companyName, $options: "i" };
    }

    if (paymentName) {
      query["payment.name"] = { $regex: paymentName, $options: "i" };
    }

    if (createdName) {
      query["createdBy.name"] = { $regex: createdName, $options: "i" };
    }

    if (createdCompany) {
      query["createdBy.company"] = { $regex: createdCompany, $options: "i" };
    }

    if (startDate && endDate) {
      query.transactionDateTime = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const [result, totalItems] = await Promise.all([
      CashLedger.find(query)
        .sort({ transactionDateTime: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      CashLedger.countDocuments(query),
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

// Get company cash flow summary
export async function getCompanyCashFlow(req, res) {
  try {
    const { companyName } = req.query;

    let matchStage = {};
    if (companyName) {
      matchStage.companyName = companyName;
    }

    const result = await CashLedger.aggregate([
      { $match: matchStage },
      { $sort: { transactionDateTime: 1 } },
      {
        $group: {
          _id: "$companyName",
          totalCashIn: {
            $sum: {
              $cond: [{ $eq: ["$cashInOrOut", "cash-in"] }, "$amount", 0],
            },
          },
          totalCashOut: {
            $sum: {
              $cond: [{ $eq: ["$cashInOrOut", "cash-out"] }, "$amount", 0],
            },
          },
          closingBalance: { $last: "$currentBalance" },
        },
      },
      {
        $project: {
          companyName: "$_id",
          totalCashIn: 1,
          totalCashOut: 1,
          closingBalance: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get all company balance sheet
export async function getAllCompanyBalanceSheet(req, res) {
  try {
    const result = await CashLedger.aggregate([
      { $sort: { transactionDateTime: 1 } },
      {
        $group: {
          _id: "$companyName",
          closingBalance: { $last: "$currentBalance" },
        },
      },
      {
        $project: {
          companyName: "$_id",
          closingBalance: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get cash ledger by ID
export async function getCashLedgerById(req, res) {
  const id = req.params.id;
  try {
    const result = await CashLedger.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Cash ledger not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new cash ledger entry
export async function createCashLedger(req, res) {
  try {
    const ledgerData = req.body;

    const lastLedger = await CashLedger.findOne({
      companyName: ledgerData.companyName,
    }).sort({ transactionDateTime: -1 });

    const oldBalance = lastLedger ? lastLedger.currentBalance : 0;
    let currentBalance = oldBalance;

    if (ledgerData.cashInOrOut === "cash-in") {
      currentBalance += ledgerData.amount;
    }

    if (ledgerData.cashInOrOut === "cash-out") {
      currentBalance -= ledgerData.amount;
    }

    ledgerData.oldBalance = oldBalance;
    ledgerData.currentBalance = currentBalance;

    const result = await CashLedger.create(ledgerData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a cash ledger entry by ID
export async function updateCashLedger(req, res) {
  const id = req.params.id;
  const ledgerData = req.body;
  try {
    const result = await CashLedger.findByIdAndUpdate(id, ledgerData, { new: true });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Cash ledger not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a cash ledger entry by ID
export async function removeCashLedger(req, res) {
  const id = req.params.id;
  try {
    const result = await CashLedger.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Cash ledger deleted successfully" });
    } else {
      res.status(404).json({ message: "Cash ledger not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
