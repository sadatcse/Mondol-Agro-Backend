import Project from "./Project.model.js";

// Get all projects
export async function getAllProjects(req, res) {
  try {
    const result = await Project.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get projects by company
export async function getProjectsByCompany(req, res) {
  const company = req.params.company;
  try {
    const result = await Project.find({ company });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get paginated projects
export async function getPaginatedProjects(req, res) {
  try {
    const { page = 1, limit = 10, search = "", company = "" } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let query = {};

    // Search by Project Name / Code
    if (search) {
      query.$or = [
        { projectName: { $regex: search, $options: "i" } },
        { projectCode: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by Company
    if (company && company !== "all") {
      query.company = company;
    }

    const [result, totalItems] = await Promise.all([
      Project.find(query)
        .populate("company")
        .populate("client")
        .populate("projectManager")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Project.countDocuments(query),
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

// Get project by ID
export async function getProjectById(req, res) {
  const id = req.params.id;
  try {
    const result = await Project.findById(id)
      .populate("company")
      .populate("client")
      .populate("projectManager")
      .populate("assignedEmployees");

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new project
export async function createProject(req, res) {
  try {
    const projectData = req.body;
    const result = await Project.create(projectData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a project by ID
export async function updateProject(req, res) {
  const id = req.params.id;
  const projectData = req.body;
  try {
    const result = await Project.findByIdAndUpdate(id, projectData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a project by ID
export async function removeProject(req, res) {
  const id = req.params.id;
  try {
    const result = await Project.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Project deleted successfully" });
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
