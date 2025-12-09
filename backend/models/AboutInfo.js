const mongoose = require("mongoose");

const aboutInfoSchema = new mongoose.Schema(
  {
    heading: { type: String, default: "About Novelty Art Press" },
    section1: { type: String },
    section2: { type: String },
    section3: { type: String },
  },
  { timestamps: true }
);

const AboutInfo = mongoose.model("AboutInfo", aboutInfoSchema);
module.exports = AboutInfo;
