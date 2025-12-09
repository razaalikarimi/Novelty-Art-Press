const express = require("express");
const router = express.Router();
const Testimonial = require("../models/Testimonial");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Public: list testimonials
router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort({
      order: 1,
      createdAt: -1,
    });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin/Manager: create testimonial
router.post(
  "/",
  protect,
  authorizeRoles("admin", "manager"),
  async (req, res) => {
    try {
      const t = await Testimonial.create(req.body);
      res.status(201).json(t);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Admin/Manager: update testimonial
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  async (req, res) => {
    try {
      const t = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(t);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Admin/Manager: delete testimonial
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  async (req, res) => {
    try {
      await Testimonial.findByIdAndDelete(req.params.id);
      res.json({ message: "Testimonial deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;
