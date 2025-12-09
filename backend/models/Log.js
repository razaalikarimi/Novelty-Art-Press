const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    action: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    meta: { type: Object },
  },
  { timestamps: true }
);

const Log = mongoose.model("Log", logSchema);
module.exports = Log;
