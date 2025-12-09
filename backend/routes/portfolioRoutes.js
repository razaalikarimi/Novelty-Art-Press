const express = require("express");
const router = express.Router();
const PortfolioItem = require("../models/PortfolioItem");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Public: list active portfolio items
router.get("/", async (req, res) => {
  try {
    const items = await PortfolioItem.find({ isActive: true }).sort({
      order: 1,
      createdAt: -1,
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin/Manager: create item
router.post(
  "/",
  protect,
  authorizeRoles("admin", "manager"),
  async (req, res) => {
    try {
      const item = await PortfolioItem.create(req.body);
      res.status(201).json(item);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Admin/Manager: update item
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  async (req, res) => {
    try {
      const item = await PortfolioItem.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(item);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Admin/Manager: delete item
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  async (req, res) => {
    try {
      await PortfolioItem.findByIdAndDelete(req.params.id);
      res.json({ message: "Portfolio item deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;
