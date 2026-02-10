import EmployeeAdvance from "./EmployeeAdvance.model.js";
import Employee from "../Employee/Employee.model.js"; // Import Employee to enable search by Name/ID

// Get all advances
export async function getAllEmployeeAdvances(req, res) {
  try {
    const result = await EmployeeAdvance.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get advances by employee
export async function getEmployeeAdvancesByEmployee(req, res) {
  const employee = req.params.employee;
  try {
    const result = await EmployeeAdvance.find({ employee });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// --- UPDATED PAGINATION CONTROLLER ---
export async function getPaginatedEmployeeAdvances(req, res) {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = "", 
      employee = "", 
      status = ""  // Added status param
    } = req.query;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let query = {};

    // 1. Status Filter
    if (status && status !== "all") {
      query.status = status;
    }

    // 2. Specific Employee Filter (e.g., from a dropdown of specific user)
    if (employee && employee !== "all") {
      query.employee = employee;
    }

    // 3. Search Logic (Reason OR Employee Name OR Employee Code)
    if (search) {
      const searchRegex = { $regex: search, $options: "i" };

      // Step A: Find employees that match the search term
      const matchingEmployees = await Employee.find({
        $or: [
          { name: searchRegex },
          { employeeId: searchRegex }
        ]
      }).select('_id');

      const matchingEmployeeIds = matchingEmployees.map(e => e._id);

      // Step B: Update query to find advances with matching Reason OR matching Employee IDs
      query.$or = [
        { reason: searchRegex },
        { employee: { $in: matchingEmployeeIds } }
      ];
    }

    const [result, totalItems] = await Promise.all([
      EmployeeAdvance.find(query)
        .populate("employee") // Ensure employee details are returned
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      EmployeeAdvance.countDocuments(query),
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

// Get advance by ID
export async function getEmployeeAdvanceById(req, res) {
  const id = req.params.id;
  try {
    const result = await EmployeeAdvance.findById(id).populate("employee");
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Employee advance not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new advance
export async function createEmployeeAdvance(req, res) {
  try {
    const advanceData = req.body;
    const result = await EmployeeAdvance.create(advanceData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update an advance by ID
export async function updateEmployeeAdvance(req, res) {
  const id = req.params.id;
  const advanceData = req.body;
  try {
    const result = await EmployeeAdvance.findByIdAndUpdate(id, advanceData, { new: true });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Employee advance not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove an advance by ID
export async function removeEmployeeAdvance(req, res) {
  const id = req.params.id;
  try {
    const result = await EmployeeAdvance.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Employee advance deleted successfully" });
    } else {
      res.status(404).json({ message: "Employee advance not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}