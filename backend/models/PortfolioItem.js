const mongoose = require("mongoose");

const portfolioItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const PortfolioItem = mongoose.model("PortfolioItem", portfolioItemSchema);
module.exports = PortfolioItem;
