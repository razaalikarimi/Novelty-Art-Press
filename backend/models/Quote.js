const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number },
    details: { type: String },
    status: {
      type: String,
      enum: ["New", "In Review", "Sent", "Converted", "Rejected"],
      default: "New",
    },
    estimatedPrice: { type: Number },
  },
  { timestamps: true }
);

const Quote = mongoose.model("Quote", quoteSchema);
module.exports = Quote;
