import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CompanySchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the company name"],
    },
    address: {
      type: String,
    },
    city: {
      type: String,

    },
    postalCode: {
      type: String,
  
    },
    country: {
      type: String,

    },
    mobile: {
      type: String,
    
    },
    email: {
      type: String,

    },
    website: {
      type: String,

    },
    tradeLicense: {
      type: String,

    },
    tinCertificate: {
      type: String,

    },
    logo: {
      type: String,
   
    },
    otherInfo: {
      type: String,
    },
  },
  { timestamps: true }
);

const Company = model("Company", CompanySchema);

export default Company;
