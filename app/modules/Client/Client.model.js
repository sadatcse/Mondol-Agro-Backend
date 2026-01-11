import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ClientSchema = Schema(
  {
    // --- Company Association ---
    companies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: [true, "Please provide at least one company"],
      },
    ],

    // --- Branding ---
    logo: {
      type: String,
      default: "https://via.placeholder.com/150",
    },

    // --- Client Identity ---
    name: {
      type: String,
      required: [true, "Please provide the client name"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
    },

    // --- Contact Persons ---
    contacts: [
      {
        firstName: {
          type: String,
        },
        lastName: {
          type: String,
        },
        email: {
          type: String,
        },
        phone: {
          type: String,
        },
        role: {
          type: String,
        },
        status: {
          type: String,
          enum: ["active", "inactive"],
          default: "active",
        },
      },
    ],

    // --- Address & Logistics ---
    address: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zip: {
        type: String,
      },
      country: {
        type: String,
        default: "USA",
      },
    },

    // --- Billing & Financials ---
    billingInfo: {
      taxId: {
        type: String,
      },
      vatNumber: {
        type: String,
      },
      paymentMethod: {
        type: String,
      },
      currency: {
        type: String,
        default: "USD",
      },
    },

    // --- Client Status ---
    status: {
      type: String,
      enum: ["active", "inactive", "prospect", "suspended"],
      default: "active",
    },

    // --- Miscellaneous ---
    tags: [
      {
        type: String,
      },
    ],
    notes: {
      type: String,
    },
    website: {
      type: String,
    },
    metadata: {
      type: Map,
      of: String,
    },
  },
  { timestamps: true }
);

const Client = model("Client", ClientSchema);

export default Client;
