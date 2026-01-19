// app/modules/ExpenseCategory/ExpenseCategory.controller.js

import ExpenseCategory from "./ExpenseCategory.model.js";

// Get all expense categories
export async function getAllExpenseCategories(req, res) {
  try {
    const result = await ExpenseCategory.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get paginated expense categories
export async function getPaginatedExpenseCategories(req, res) {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let query = {};

    if (search) {
      query.categoryName = { $regex: search, $options: "i" };
    }

    const [result, totalItems] = await Promise.all([
      ExpenseCategory.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      ExpenseCategory.countDocuments(query),
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

// Get expense category by ID
export async function getExpenseCategoryById(req, res) {
  const id = req.params.id;
  try {
    const result = await ExpenseCategory.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Expense category not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new expense category
export async function createExpenseCategory(req, res) {
  try {
    const expenseCategoryData = req.body;
    const result = await ExpenseCategory.create(expenseCategoryData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update an expense category by ID
export async function updateExpenseCategory(req, res) {
  const id = req.params.id;
  const expenseCategoryData = req.body;
  try {
    const result = await ExpenseCategory.findByIdAndUpdate(id, expenseCategoryData, { new: true });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Expense category not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove an expense category by ID
export async function removeExpenseCategory(req, res) {
  const id = req.params.id;
  try {
    const result = await ExpenseCategory.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Expense category deleted successfully" });
    } else {
      res.status(404).json({ message: "Expense category not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
