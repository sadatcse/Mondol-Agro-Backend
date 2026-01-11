import mongoose from "mongoose";
const { Schema, model } = mongoose;

const EmployeeSchema = Schema(
  {
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

    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Please provide the company"],
    },

    rfidNumber: {
      type: String,

      unique: true,
    },
    nationalIdCardName: {
      type: String,

    },
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

    fatherName: {
      type: String,
  
    },
    motherName: {
      type: String,
  
    },

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

    emergencyContactName: {
      type: String,

    },
    emergencyContactPhone: {
      type: String,

    },
    emergencyContactRelation: {
      type: String,

    },

    facebookProfile: {
      type: String,
    },
    linkedinProfile: {
      type: String,
    },
    status: {
  type: String,
  enum: ["Active", "Inactive", "Resigned"],
  default: "Active"
}
  },
  { timestamps: true }
);

const Employee = model("Employee", EmployeeSchema);

export default Employee;
