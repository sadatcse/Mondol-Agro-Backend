import Vendor from "./Vendor.model.js";

// Get all vendors
export async function getAllVendors(req, res) {
  try {
    const result = await Vendor.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get vendors by city
export async function getVendorsByCity(req, res) {
  const city = req.params.city;
  try {
    const result = await Vendor.find({ city });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getPaginatedVendors(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalVendors] = await Promise.all([
      Vendor.find().skip(skip).limit(limit).exec(),
      Vendor.countDocuments(),
    ]);

    const totalPages = Math.ceil(totalVendors / limit);

    res.status(200).json({
      data: result,
      currentPage: page,
      totalPages: totalPages,
      totalItems: totalVendors,
      pageSize: limit,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get vendor by ID
export async function getVendorById(req, res) {
  const id = req.params.id;
  try {
    const result = await Vendor.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Vendor not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new vendor
export async function createVendor(req, res) {
  try {
    const vendorData = req.body;
    const result = await Vendor.create(vendorData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a vendor by ID
export async function updateVendor(req, res) {
  const id = req.params.id;
  const vendorData = req.body;
  try {
    const result = await Vendor.findByIdAndUpdate(id, vendorData, { new: true });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Vendor not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a vendor by ID
export async function removeVendor(req, res) {
  const id = req.params.id;
  try {
    const result = await Vendor.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Vendor deleted successfully" });
    } else {
      res.status(404).json({ message: "Vendor not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
