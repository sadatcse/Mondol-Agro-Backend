import Employee from "./Employee.model.js";
import User from "../User/Users.model.js";
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

export async function getDirectoryEmployees(req, res) {
  try {
    const { status, department, search, company } = req.query; // Add company here
    let query = {};

    if (status && status !== "Active") query.status = status; // Adjusted to match your default 'Active'
    if (department && department !== "All Employees") query.department = department;
    
    // NEW: Company Filter
    if (company && company !== "All Companies") query.company = company;

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { employeeId: { $regex: search, $options: "i" } }
      ];
    }

    const result = await Employee.find(query)
      .populate("company") // Populate to get company names
      .sort({ name: 1 });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
// Create a new employee
export async function createEmployee(req, res) {
  try {
    const employeeData = req.body;

// 1. Check if Email exists in Employee Model
    const duplicateEmployee = await Employee.findOne({ employeeEmail: employeeData.employeeEmail });
    if (duplicateEmployee) {
      return res.status(400).json({ message: "This email is already registered in the Employee directory." });
    }

    // 2. Check if Email exists in User Model
    const existingUser = await User.findOne({ email: employeeData.employeeEmail });
    if (existingUser) {
      return res.status(400).json({ message: "An account with this email already exists in the system." });
    }

    // 2. Create the Employee record
    const newEmployee = await Employee.create(employeeData);

    // 3. Create the User record for login
    // We use the role passed from frontend, or default to 'user'
    await User.create({
      email: employeeData.employeeEmail,
      password: "Welcome123", // Set a default temporary password
      role: employeeData.role || "user", 
      status: "active"
    });

    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update an employee by ID
export async function updateEmployee(req, res) {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const employee = await Employee.findByIdAndUpdate(id, updateData, { new: true });
    
    // If email or role is updated, sync the User account
    if (employee) {
      await User.findOneAndUpdate(
        { email: employee.employeeEmail },
        { role: updateData.role } // Update the role in the User model
      );
    }

    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
export async function getEmployeeProfile(req, res) {
  try {
    // CHANGE: Get email from the frontend request URL (e.g., ?email=john@example.com)
    const email = req.query.email; 

    if (!email) {
      return res.status(400).json({ message: "Email parameter is required." });
    }

    // Find Employee where employeeEmail matches the requested email
    const employee = await Employee.findOne({ employeeEmail: email }).populate("company");

    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: "Employee profile not found for this email." });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
export async function getEmployeePublicDetails(req, res) {
  const { id } = req.params;
  try {
    // "-" prefix in select excludes the fields
    const result = await Employee.findById(id).select(
      "-rfidNumber -company -currentSalary -emergencyContactRelation -bankInfo -status"
    );
    
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function removeEmployee(req, res) {
  const { id } = req.params;

  try {
    // 1. Get Employee details
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    const emailToMatch = employee.employeeEmail;

    // 2. Check if the User exists
    const userAccount = await User.findOne({ email: emailToMatch });

    if (!userAccount) {
      // CONDITION A: User account not found by email -> Just remove employee
      await Employee.findByIdAndDelete(id);
      return res.status(200).json({ 
        message: "Employee removed. (No linked user account was found to delete)." 
      });
    }

    // 3. CONDITION B: User exists -> Must remove user successfully first
    try {
      const deletedUser = await User.findByIdAndDelete(userAccount._id);
      
      if (deletedUser) {
        // User was removed, now remove employee
        await Employee.findByIdAndDelete(id);
        return res.status(200).json({ 
          message: "Success: Both user account and employee record removed." 
        });
      } else {
        // This handles cases where findByIdAndDelete returns null unexpectedly
        throw new Error("User found but could not be removed.");
      }
    } catch (userErr) {
      // User exists but deletion failed (database error, etc.)
      return res.status(500).json({ 
        message: "Employee not removed because user account deletion failed.",
        error: userErr.message 
      });
    }

  } catch (err) {
    console.error("Sync Delete Error:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
}