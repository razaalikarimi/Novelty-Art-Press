const express = require("express");
const router = express.Router();
const Service = require("../models/Service");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Public: list active services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({
      order: 1,
      createdAt: -1,
    });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin/Manager: create service
router.post(
  "/",
  protect,
  authorizeRoles("admin", "manager"),
  async (req, res) => {
    try {
      const service = await Service.create(req.body);
      res.status(201).json(service);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Admin/Manager: update service
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  async (req, res) => {
    try {
      const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(service);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Admin/Manager: delete service
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  async (req, res) => {
    try {
      await Service.findByIdAndDelete(req.params.id);
      res.json({ message: "Service deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;
