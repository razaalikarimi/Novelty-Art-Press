const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// GET all users
router.get("/", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user role or activation
router.put("/:id", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const { role, isActive } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (role) user.role = role;
    if (typeof isActive === "boolean") user.isActive = isActive;
    await user.save();
    res.json({ message: "User updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
