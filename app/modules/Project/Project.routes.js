import { Router } from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  removeProject,
  getPaginatedProjects,
  getProjectsByCompany,
} from "./Project.controller.js";

const ProjectRoutes = Router();

// Get all projects
ProjectRoutes.get("/", getAllProjects);

// Get projects by company
ProjectRoutes.get("/:company/get-all", getProjectsByCompany);

// Get project by ID
ProjectRoutes.get("/get-id/:id", getProjectById);

// Create a new project
ProjectRoutes.post("/post", createProject);

// Update a project by ID
ProjectRoutes.put("/update/:id", updateProject);

// Delete a project by ID
ProjectRoutes.delete("/delete/:id", removeProject);

// Get paginated projects
ProjectRoutes.get("/paginate", getPaginatedProjects);

export default ProjectRoutes;
