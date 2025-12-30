import mongoose from "mongoose";
const { Schema, model } = mongoose;

const EmployeeSchema = Schema(
  {
    // --- Basic Info ---
    name: {
      type: String,
      required: [true, "Please provide the employee name"],
    },
    employeeId: {
      type: String,
      unique: true,
    },
    employeePhoto: {
      type: String,

    },

    // --- Company Info ---
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Please provide the company"],
    },

    // --- Identification ---
    rfidNumber: {
      type: String,

      unique: true,
    },
    nationalIdCardName: {
      type: String,

    },

    // --- Job Details ---
    department: {
      type: String,

    },
    designation: {
      type: String,

    },
    joiningDate: {
      type: Date,

    },
    currentSalary: {
      type: Number,
    
    },

    // --- Personal Info ---
    fatherName: {
      type: String,
  
    },
    motherName: {
      type: String,
  
    },

    // --- Contact Info ---
    employeePhone: {
      type: String,
      required: [true, "Please provide the employee phone number"],
    },
    employeeEmail: {
      type: String,
      required: [true, "Please provide the employee email"],
    },
    employeeAddress: {
      type: String,
      required: [true, "Please provide the employee address"],
    },
    city: {
      type: String,
      required: [true, "Please provide the city"],
    },

    // --- Emergency Contact ---
    emergencyContactName: {
      type: String,

    },
    emergencyContactPhone: {
      type: String,

    },
    emergencyContactRelation: {
      type: String,

    },

    // --- Social Profiles ---
    facebookProfile: {
      type: String,
    },
    linkedinProfile: {
      type: String,
    },
  },
  { timestamps: true }
);

const Employee = model("Employee", EmployeeSchema);

export default Employee;
