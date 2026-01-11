import { Router } from "express";
import {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  removeClient,
  getPaginatedClients,
  getClientsByCity,
} from "./Client.controller.js";

const ClientRoutes = Router();

// Get all clients
ClientRoutes.get("/", getAllClients);

// Get clients by city
ClientRoutes.get("/:city/get-all", getClientsByCity);

// Get client by ID
ClientRoutes.get("/get-id/:id", getClientById);

// Create a new client
ClientRoutes.post("/post", createClient);

// Update a client by ID
ClientRoutes.put("/update/:id", updateClient);

// Delete a client by ID
ClientRoutes.delete("/delete/:id", removeClient);

// Get paginated clients
ClientRoutes.get("/paginate", getPaginatedClients);

export default ClientRoutes;
