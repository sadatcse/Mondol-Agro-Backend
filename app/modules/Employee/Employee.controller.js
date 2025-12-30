import Employee from "./Employee.model.js";

// Get all employees
export async function getAllEmployees(req, res) {
  try {
    const result = await Employee.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get employees by city
export async function getEmployeesByCity(req, res) {
  const city = req.params.city;
  try {
    const result = await Employee.find({ city });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getPaginatedEmployees(req, res) {
  try {
    const { page = 1, limit = 10, search = "", company = "" } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build Dynamic Query Object
    let query = {};
    
    // Search by Name/ID logic
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { employeeId: { $regex: search, $options: "i" } }
      ];
    }

    // Filter by Company ID (if provided and not empty)
    if (company && company !== "all") {
      query.company = company; 
    }

    const [result, totalItems] = await Promise.all([
      Employee.find(query)
        .populate("company") // Join company data to show Name in table
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Employee.countDocuments(query),
    ]);

    res.status(200).json({
      data: result,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
      currentPage: parseInt(page)
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get employee by ID
export async function getEmployeeById(req, res) {
  const id = req.params.id;
  try {
    const result = await Employee.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new employee
export async function createEmployee(req, res) {
  try {
    const employeeData = req.body;
    const result = await Employee.create(employeeData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update an employee by ID
export async function updateEmployee(req, res) {
  const id = req.params.id;
  const employeeData = req.body;
  try {
    const result = await Employee.findByIdAndUpdate(id, employeeData, { new: true });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove an employee by ID
export async function removeEmployee(req, res) {
  const id = req.params.id;
  try {
    const result = await Employee.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Employee deleted successfully" });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}