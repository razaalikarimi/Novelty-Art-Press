const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/ContactMessage");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// POST /api/contact (public)
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // ✅ Name + Phone + Message required
    if (!name || !phone || !message) {
      return res
        .status(400)
        .json({ message: "Name, phone and message are required" });
    }

    const contact = await ContactMessage.create({
      name,
      email: email || "",
      phone,
      message,
    });

    res.status(201).json(contact);
  } catch (err) {
    console.error("POST /api/contact error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/contact (admin/manager)
router.get(
  "/",
  protect,
  authorizeRoles("admin", "manager"),
  async (req, res) => {
    try {
      const messages = await ContactMessage.find().sort({ createdAt: -1 });
      res.json(messages);
    } catch (err) {
      console.error("GET /api/contact error:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

// PUT /api/contact/:id/status (admin/manager) – update status
router.put(
  "/:id/status",
  protect,
  authorizeRoles("admin", "manager"),
  async (req, res) => {
    try {
      const { status } = req.body;
      const updated = await ContactMessage.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );
      if (!updated) {
        return res.status(404).json({ message: "Contact message not found" });
      }
      res.json(updated);
    } catch (err) {
      console.error("PUT /api/contact/:id/status error:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

module.exports = router;
