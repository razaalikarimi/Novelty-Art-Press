const express = require("express");
const router = express.Router();
const Quote = require("../models/Quote");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Public: create quote
router.post("/", async (req, res) => {
  try {
    const quote = await Quote.create(req.body);
    res.status(201).json(quote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin/Manager: list quotes
router.get("/", protect, authorizeRoles("admin", "manager"), async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 }).populate("product");
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin/Manager: update status or price
router.put("/:id", protect, authorizeRoles("admin", "manager"), async (req, res) => {
  try {
    const quote = await Quote.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(quote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
