const express = require("express");
const router = express.Router();
const AboutInfo = require("../models/AboutInfo");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Public: get about info (single doc)
router.get("/", async (req, res) => {
  try {
    let about = await AboutInfo.findOne();
    if (!about) {
      about = await AboutInfo.create({
        heading: "About Novelty Art Press",
        section1:
          "Novelty Art Press is a print and design partner for brands, agencies and small businesses. We combine modern printing machines with a detail-focused team to deliver clean, consistent results.",
        section2:
          "Our team has experience across offset, digital and large format printing. We understand paper, ink, color profiles and finishing so you do not have to worry about the technical side.",
        section3:
          "Whether you need a small batch of business cards or a full campaign with flyers, standees and packaging, we can support you from file preparation to final delivery.",
      });
    }
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin only: update about info
router.put("/", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    let about = await AboutInfo.findOne();
    if (!about) {
      about = await AboutInfo.create(req.body);
    } else {
      Object.assign(about, req.body);
      await about.save();
    }
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
