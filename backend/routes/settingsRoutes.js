const express = require("express");
const router = express.Router();
const Setting = require("../models/Setting");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Public: get settings
router.get("/", async (req, res) => {
  try {
    const setting = await Setting.findOne();
    res.json(setting);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: update settings
router.put("/", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    let setting = await Setting.findOne();
    if (!setting) {
      setting = await Setting.create(req.body);
    } else {
      Object.assign(setting, req.body);
      await setting.save();
    }
    res.json(setting);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
