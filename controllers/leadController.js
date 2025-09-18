
const Lead = require("../models/Lead"); 

// Create Lead
const createLead = async (req, res) => {
    try {
        const lead = await Lead.create(req.body);
        res.status(201).json(lead);
    } catch (error) {
        res.status(400).json({ message: "Error creating lead", error });
    }
};


// Get Leads with Pagination + Full Filtering
const getLeads = async (req, res) => {
  try {
    let { page = 1, limit = 20, ...filters } = req.query;
    page = parseInt(page);
    limit = Math.min(parseInt(limit), 100); // cap at 100

    const query = {};

    // ---------- String filters (equals, contains) ----------
    if (filters.email_eq) query.email = filters.email_eq;
    if (filters.email_contains) query.email = { $regex: filters.email_contains, $options: "i" };

    if (filters.company_eq) query.company = filters.company_eq;
    if (filters.company_contains) query.company = { $regex: filters.company_contains, $options: "i" };

    if (filters.city_eq) query.city = filters.city_eq;
    if (filters.city_contains) query.city = { $regex: filters.city_contains, $options: "i" };

    // ---------- Enum filters (equals, in) ----------
    if (filters.status_eq) query.status = filters.status_eq;
    if (filters.status_in) query.status = { $in: filters.status_in.split(",") };

    if (filters.source_eq) query.source = filters.source_eq;
    if (filters.source_in) query.source = { $in: filters.source_in.split(",") };

    // ---------- Number filters (equals, gt, lt, between) ----------
    if (filters.score_eq) query.score = Number(filters.score_eq);
    if (filters.score_gt) query.score = { ...query.score, $gt: Number(filters.score_gt) };
    if (filters.score_lt) query.score = { ...query.score, $lt: Number(filters.score_lt) };
    if (filters.score_between) {
      const [min, max] = filters.score_between.split(",").map(Number);
      query.score = { $gte: min, $lte: max };
    }

    if (filters.lead_value_eq) query.lead_value = Number(filters.lead_value_eq);
    if (filters.lead_value_gt) query.lead_value = { ...query.lead_value, $gt: Number(filters.lead_value_gt) };
    if (filters.lead_value_lt) query.lead_value = { ...query.lead_value, $lt: Number(filters.lead_value_lt) };
    if (filters.lead_value_between) {
      const [min, max] = filters.lead_value_between.split(",").map(Number);
      query.lead_value = { $gte: min, $lte: max };
    }

    // ---------- Date filters (on, before, after, between) ----------
    const dateFields = ["created_at", "last_activity_at"];
    for (const field of dateFields) {
      if (filters[`${field}_on`]) {
        const start = new Date(filters[`${field}_on`]);
        const end = new Date(filters[`${field}_on`]);
        end.setDate(end.getDate() + 1);
        query[field === "created_at" ? "createdAt" : field] = { $gte: start, $lt: end };
      }
      if (filters[`${field}_before`]) {
        query[field === "created_at" ? "createdAt" : field] = { ...query[field], $lte: new Date(filters[`${field}_before`]) };
      }
      if (filters[`${field}_after`]) {
        query[field === "created_at" ? "createdAt" : field] = { ...query[field], $gte: new Date(filters[`${field}_after`]) };
      }
      if (filters[`${field}_between`]) {
        const [start, end] = filters[`${field}_between`].split(",");
        query[field === "created_at" ? "createdAt" : field] = { $gte: new Date(start), $lte: new Date(end) };
      }
    }

    // ---------- Boolean filter ----------
    if (filters.is_qualified) query.is_qualified = filters.is_qualified === "true";

    // ---------- Fetch with Pagination ----------
    const total = await Lead.countDocuments(query);
    const leads = await Lead.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      data: leads,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching leads", error });
  }
};


// Get Lead by ID
const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lead", error });
  }
};


// Update Lead
const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (error) {
    res.status(400).json({ message: "Error updating lead", error });
  }
};


// Delete Lead
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting lead", error });
  }
};



module.exports = { createLead, getLeads, getLeadById, updateLead, deleteLead };
