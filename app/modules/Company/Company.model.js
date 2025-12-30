import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CompanySchema = new Schema(
  {
    companyName: {
      type: String,
      required: [true, "Please provide the company name"],
      trim: true,
    },

    parentGroupName: {
      type: String,
      required: [true, "Please provide the parent group name"],
      trim: true,
    },

    companyType: {
      type: String,
      enum: [
        "Private Limited",
        "Public Limited",
        "Subsidiary",
        "One Person Company",
        "Branch Office",
        "Sister Concern",
      ],
      required: [true, "Please provide the company type"],
    },

    registrationNumber: {
      type: String,
      unique: true,
      trim: true,
    },

    tradeLicenseNumber: {
      type: String,
      trim: true,
    },

    tinNumber: {
      type: String,
      trim: true,
    },

    binNumber: {
      type: String,
      trim: true,
    },

    registeredAddress: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      trim: true,
    },

    managingDirectorName: {
      type: String,
      trim: true,
    },

    contactPhone: {
      type: String,
      trim: true,
    },

    companyEmail: {
      type: String,
      lowercase: true,
      trim: true,
    },

    website: {
      type: String,
      trim: true,
    },

    businessNature: {
      type: [String],
    },

    logo: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Company = model("Company", CompanySchema);

export default Company;
