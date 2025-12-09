// const mongoose = require("mongoose");

// const contactMessageSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String },
//     message: { type: String, required: true },
//     status: {
//       type: String,
//       enum: ["New", "Seen", "Replied", "Closed"],
//       default: "New",
//     },
//   },
//   { timestamps: true }
// );

// const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);
// module.exports = ContactMessage;

// backend/models/ContactMessage.js
// const mongoose = require("mongoose");

// const contactMessageSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },

//     // ✅ Email OPTIONAL
//     email: { type: String, default: "" },

//     phone: { type: String },

//     message: { type: String, required: true },

//     status: {
//       type: String,
//       enum: ["New", "Seen", "Replied", "Closed"],
//       default: "New",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("ContactMessage", contactMessageSchema);

const mongoose = require("mongoose");

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    // ✅ Email optional
    email: { type: String, default: "" },

    // ✅ Phone required
    phone: { type: String, required: true },

    message: { type: String, required: true },

    status: {
      type: String,
      enum: ["New", "Seen", "Replied", "Closed"],
      default: "New",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactMessage", contactMessageSchema);
