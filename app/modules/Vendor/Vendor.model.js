import mongoose from "mongoose";
const { Schema, model } = mongoose;

const VendorSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the vendor name"],
    },
    description: {
      type: String,
      required: [true, "Please provide the vendor description"],
    },
    contactPerson: {
      type: String,
      required: [true, "Please provide the contact person"],
    },
    contactPersonMobile: {
      type: String,
      required: [true, "Please provide the contact person's mobile number"],
    },
    vendorPhone: {
      type: String,
      required: [true, "Please provide the vendor phone number"],
    },
    vendorEmail: {
      type: String,
      required: [true, "Please provide the vendor email"],
    },
    vendorAddress: {
      type: String,
      required: [true, "Please provide the vendor address"],
    },
    city: {
      type: String,
      required: [true, "Please provide the city"],
    },
    tradeLicense: {
      type: String,
      required: [true, "Please provide the trade license"],
    },
    purpose: {
      type: [String],
      required: [true, "Please provide at least one purpose"],
    },
  },
  { timestamps: true }
);

const Vendor = model("Vendor", VendorSchema);

export default Vendor;
