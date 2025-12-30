import Company from "./Company.model.js";

// Get all companies
export async function getAllCompanies(req, res) {
  try {
    const result = await Company.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get companies by city
export async function getCompaniesByCity(req, res) {
  const city = req.params.city;
  try {
    const result = await Company.find({ city });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getPaginatedCompanies(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const skip = (page - 1) * limit;

    // Create a search query
    const query = search 
      ? { companyName: { $regex: search, $options: "i" } } 
      : {};

    const [result, totalCompanies] = await Promise.all([
      Company.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
      Company.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalCompanies / limit);

    res.status(200).json({
      data: result,
      currentPage: page,
      totalPages: totalPages,
      totalItems: totalCompanies,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get company by ID
export async function getCompanyById(req, res) {
  const id = req.params.id;
  try {
    const result = await Company.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Company not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new company
export async function createCompany(req, res) {
  try {
    const companyData = req.body;
    const result = await Company.create(companyData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a company by ID
export async function updateCompany(req, res) {
  const id = req.params.id;
  const companyData = req.body;
  try {
    const result = await Company.findByIdAndUpdate(id, companyData, { new: true });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Company not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a company by ID
export async function removeCompany(req, res) {
  const id = req.params.id;
  try {
    const result = await Company.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Company deleted successfully" });
    } else {
      res.status(404).json({ message: "Company not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}