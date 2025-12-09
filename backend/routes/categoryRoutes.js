const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Public: list categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: create
router.post("/", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: update
router.put("/:id", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const cat = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(cat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: delete
router.delete("/:id", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
