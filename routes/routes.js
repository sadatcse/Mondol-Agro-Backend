// main routes update

import { Router } from "express";

import userRoutes from "../app/modules/User/Users.routes.js";
import TransactionLogRoutes from "../app/modules/TransactionLog/TransactionLog.routes.js";
import transactionLogger from "../middleware/transactionLogger.js";
import CompanyRoutes from "../app/modules/Company/Company.routes.js";
import ProjectRoutes from "../app/modules/Project/Project.routes.js";
import VendorRoutes from "../app/modules/Vendor/Vendor.routes.js";
import EmployeeRoutes from "../app/modules/Employee/Employee.routes.js";
import ClientRoutes from "../app/modules/Client/Client.routes.js";
import DepartmentRoutes from "../app/modules/Department/Department.routes.js";
import DesignationRoutes from "../app/modules/Designation/Designation.routes.js";
import LeaveRoutes from "../app/modules/Leave/Leave.routes.js";
import SalaryComponentRoutes from "../app/modules/SalaryComponent/SalaryComponent.routes.js";
import { getImageUrl } from "../config/space.js";
import AttendanceRoutes from "../app/modules/Attendance/Attendance.routes.js";
import EmployeeLeaveRoutes from "../app/modules/EmployeeLeave/EmployeeLeave.routes.js";
import TimesheetRoutes from "../app/modules/Timesheet/Timesheet.routes.js";
import rolepermissionRoutes from "../app/modules/RolePermission/rolePermission.routes.js";
import permissionRoutes from "../app/modules/Permission/permission.routes.js";
import PaymentTypeRoutes from "../app/modules/PaymentType/PaymentType.routes.js";
import ExpenseCategoryRoutes from "../app/modules/ExpenseCategory/ExpenseCategory.routes.js";
import CashLedgerRoutes from "../app/modules/CashLedger/CashLedger.routes.js";

const routes = Router();

routes.use(transactionLogger);

routes.post("/get-image-url", getImageUrl);
routes.use("/user", userRoutes);
routes.use("/company", CompanyRoutes);
routes.use("/project", ProjectRoutes);
routes.use("/vendor", VendorRoutes);
routes.use("/employee", EmployeeRoutes);
routes.use("/client", ClientRoutes);
routes.use("/department", DepartmentRoutes);
routes.use("/designation", DesignationRoutes);
routes.use("/leave", LeaveRoutes);
routes.use("/salary-component", SalaryComponentRoutes);
routes.use("/transaction-logs", TransactionLogRoutes);
routes.use("/attendance", AttendanceRoutes);
routes.use("/employee-leave", EmployeeLeaveRoutes);
routes.use("/timesheet", TimesheetRoutes);
routes.use('/role-permissions', rolepermissionRoutes);
routes.use("/permissions", permissionRoutes);
routes.use("/payment-type", PaymentTypeRoutes);
routes.use("/expense-category", ExpenseCategoryRoutes);
routes.use("/cash-ledger", CashLedgerRoutes);


export default routes;
