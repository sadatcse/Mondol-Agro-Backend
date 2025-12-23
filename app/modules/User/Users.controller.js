import User from "./Users.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Get all users with pagination and search
export async function getAllUsers(req, res) {
  try {
    // --- 1. Extract Query Parameters ---
    const { search } = req.query;
    // Parse page and limit, providing default values
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // --- 2. Build Query Filter ---
    let queryFilter = {};
    if (search) {
      queryFilter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    // --- 3. Execute Database Queries ---
    const [totalItems, users] = await Promise.all([
      User.countDocuments(queryFilter),
      User.find(queryFilter)
          .sort({ createdAt: -1 })
          .limit(limit)
          .skip(skip)
    ]);

    // --- 4. Calculate Pagination Details ---
    const totalPages = Math.ceil(totalItems / limit);

    // --- 5. Send Formatted Response ---
    res.status(200).json({
      data: users,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
      },
    });

  } catch (err) {
    console.error("Error in getAllUsers:", err);
    res.status(500).send({ error: "An error occurred while fetching users." });
  }
}

// Get user by ID
export async function getUserById(req, res) {
  const id = req.params.id;
  try {
    const result = await User.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new user with hashed password
export async function createUser(req, res) {
  try {
    const userData = req.body;
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const result = await User.create(userData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Login user
export async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.status === "inactive") {
      return res.status(403).json({ message: "Account is inactive. Please contact support." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, "secretKey", { expiresIn: "24h" });

    // Remove password field from user object before sending response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({ message: "Login successful", user: userResponse, token });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a user by ID
export async function removeUser(req, res) {
  const id = req.params.id;
  try {
    const result = await User.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a user by ID
export async function updateUser(req, res) {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    Object.keys(updateData).forEach((key) => {

      if (key === 'password' && !updateData.password) {
        return; 
      }
      user[key] = updateData[key];
    });
    const updatedUser = await user.save();
    const userResponse = updatedUser.toObject();
    delete userResponse.password;
    
    res.status(200).json(userResponse);

  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "An error occurred: the email may already be in use." });
    }
    
    console.error("Error in updateUser:", err);
    res.status(500).send({ error: "An error occurred while updating the user." });
  }
}

export async function logoutUser(req, res) {
  try {
    const { email } = req.body;

    // You can perform additional logout-related tasks here if needed

    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Change password for an authenticated user
export async function changePassword(req, res) {
  // Assuming 'req.user.id' is populated by an authentication middleware
  const userId = req.user?.id; 
  const { oldPassword, newPassword } = req.body;
  
  if (!userId) {
    return res.status(401).json({ message: "Authentication error, user not found." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the old password matches
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect old password" });
    }

    // The 'pre.save' hook in the model will automatically hash the new password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
}
