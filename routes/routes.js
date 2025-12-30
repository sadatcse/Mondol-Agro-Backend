import { Router } from "express";

import userRoutes from "../app/modules/User/Users.routes.js";

import TransactionLogRoutes from "../app/modules/TransactionLog/TransactionLog.routes.js";
import transactionLogger from "../middleware/transactionLogger.js";
import CompanyRoutes from "../app/modules/Company/Company.routes.js";
import ProjectRoutes from "../app/modules/Project/Project.routes.js";
import VendorRoutes from "../app/modules/Vendor/Vendor.routes.js";
import EmployeeRoutes from "../app/modules/Employee/Employee.routes.js";
import { getImageUrl } from "../config/space.js";


const routes = Router();


routes.use(transactionLogger);

routes.post("/get-image-url", getImageUrl);
routes.use("/user", userRoutes);
routes.use("/company", CompanyRoutes);
routes.use("/project", ProjectRoutes);
routes.use("/vendor", VendorRoutes);
routes.use("/employee", EmployeeRoutes);
routes.use("/transaction-logs", TransactionLogRoutes);

export default routes;