const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    companyName: { type: String, default: "Art Press" },
    logoUrl: { type: String },
    phone: { type: String },
    email: { type: String },
    address: { type: String },
    whatsappNumber: { type: String },
  },
  { timestamps: true }
);

const Setting = mongoose.model("Setting", settingsSchema);
module.exports = Setting;
