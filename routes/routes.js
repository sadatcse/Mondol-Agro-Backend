import { Router } from "express";

import userRoutes from "../app/modules/User/Users.routes.js";

import TransactionLogRoutes from "../app/modules/TransactionLog/TransactionLog.routes.js";
import transactionLogger from "../middleware/transactionLogger.js";
import CompanyRoutes from "../app/modules/Company/Company.routes.js";
import ProjectRoutes from "../app/modules/Project/Project.routes.js";
import VendorRoutes from "../app/modules/Vendor/Vendor.routes.js";


const routes = Router();

// This middleware will log all transactions
routes.use(transactionLogger);

// Define API endpoints for different modules
routes.use("/user", userRoutes);

routes.use("/company", CompanyRoutes);
routes.use("/project", ProjectRoutes);

routes.use("/vendor", VendorRoutes);

// Endpoint for transaction logs
routes.use("/transaction-logs", TransactionLogRoutes);

export default routes;
