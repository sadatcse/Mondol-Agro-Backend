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

// Get projects by projectManager
export async function getProjectsByManager(req, res) {
  const projectManager = req.params.projectManager;
  try {
    const result = await Project.find({ projectManager });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getPaginatedProjects(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalProjects] = await Promise.all([
      Project.find().skip(skip).limit(limit).exec(),
      Project.countDocuments(),
    ]);

    const totalPages = Math.ceil(totalProjects / limit);

    res.status(200).json({
      data: result,
      currentPage: page,
      totalPages: totalPages,
      totalItems: totalProjects,
      pageSize: limit,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get project by ID
export async function getProjectById(req, res) {
  const id = req.params.id;
  try {
    const result = await Project.findById(id);
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
    const result = await Project.findByIdAndUpdate(id, projectData, { new: true });
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
