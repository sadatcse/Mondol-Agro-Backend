import { Router } from "express";
import {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  removeCompany,
  getPaginatedCompanies,
  getCompaniesByCity,
} from "./Company.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js";
const CompanyRoutes = Router();

// Get all companies
CompanyRoutes.get("/", getAllCompanies);

// Get companies by city
CompanyRoutes.get("/:city/get-all", getCompaniesByCity);

// Get company by ID
CompanyRoutes.get("/get-id/:id", getCompanyById);

// Create a new company
CompanyRoutes.post("/post", createCompany);

// Update a company by ID
CompanyRoutes.put("/update/:id", updateCompany);

// Delete a company by ID
CompanyRoutes.delete("/delete/:id", removeCompany);

// Get paginated companies
CompanyRoutes.get("/paginate", getPaginatedCompanies);

export default CompanyRoutes;
