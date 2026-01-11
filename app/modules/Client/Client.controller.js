import Client from "./Client.model.js";

// Get all clients
export async function getAllClients(req, res) {
  try {
    const result = await Client.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get clients by city
export async function getClientsByCity(req, res) {
  const city = req.params.city;
  try {
    const result = await Client.find({ "address.city": city });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get paginated clients
export async function getPaginatedClients(req, res) {
  try {
    const { page = 1, limit = 10, search = "", company = "" } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let query = {};

    // Search by Name/Email logic
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by Company ID
    if (company && company !== "all") {
      query.companies = company;
    }

    const [result, totalItems] = await Promise.all([
      Client.find(query)
        .populate("companies")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Client.countDocuments(query),
    ]);

    res.status(200).json({
      data: result,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
      currentPage: parseInt(page),
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get client by ID
export async function getClientById(req, res) {
  const id = req.params.id;
  try {
    const result = await Client.findById(id).populate("companies");
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Client not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new client
export async function createClient(req, res) {
  try {
    const clientData = req.body;
    const result = await Client.create(clientData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a client by ID
export async function updateClient(req, res) {
  const id = req.params.id;
  const clientData = req.body;
  try {
    const result = await Client.findByIdAndUpdate(id, clientData, { new: true });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Client not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a client by ID
export async function removeClient(req, res) {
  const id = req.params.id;
  try {
    const result = await Client.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Client deleted successfully" });
    } else {
      res.status(404).json({ message: "Client not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
