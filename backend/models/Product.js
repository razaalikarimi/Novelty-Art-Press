// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     description: { type: String },
//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: true,
//     },
//     pricePerUnit: { type: Number, required: true },
//     minQty: { type: Number, default: 1 },
//     maxQty: { type: Number, default: 10000 },
//     options: [{ type: String }],
//     imageUrl: { type: String },
//     isActive: { type: Boolean, default: true },
//   },
//   { timestamps: true }
// );

// const Product = mongoose.model("Product", productSchema);
// module.exports = Product;

// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     description: { type: String },
//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: true,
//     },
//     pricePerUnit: { type: Number, required: true },
//     minQty: { type: Number, default: 1 },
//     maxQty: { type: Number, default: 10000 },
//     // e.g. Size / finish / paper type etc.
//     options: [{ type: String }],

//     // Main thumbnail / primary image (uploaded via multer)
//     imageUrl: { type: String },

//     // Extra images (CDN URLs, hosted elsewhere, comma-separated from frontend)
//     extraImages: [{ type: String }],

//     // Optional video (YouTube / hosted link)
//     videoUrl: { type: String },

//     isActive: { type: Boolean, default: true },
//   },
//   { timestamps: true }
// );

// const Product = mongoose.model("Product", productSchema);
// module.exports = Product;

// backend/models/Product.js
// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     description: { type: String },

//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: true,
//     },

//     // ✅ OPTIONAL price
//     pricePerUnit: {
//       type: Number,
//       default: 0,
//     },

//     minQty: { type: Number, default: 1 },
//     maxQty: { type: Number, default: 10000 },

//     // e.g. Size / finish / paper type etc.
//     options: [{ type: String }],

//     // Main thumbnail / primary image (uploaded via multer)
//     imageUrl: { type: String },

//     // Extra images (CDN URLs, hosted elsewhere, comma-separated from frontend)
//     extraImages: [{ type: String }],

//     // Optional video (YouTube / hosted link)
//     videoUrl: { type: String },

//     isActive: { type: Boolean, default: true },
//   },
//   { timestamps: true }
// );

// const Product = mongoose.model("Product", productSchema);
// module.exports = Product;

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    // ✅ OPTIONAL PRICE (no required)
    pricePerUnit: {
      type: Number,
      default: 0,
    },

    minQty: { type: Number, default: 1 },
    maxQty: { type: Number, default: 10000 },

    options: [{ type: String }],

    imageUrl: { type: String }, // main image path (/uploads/...)
    extraImages: [{ type: String }], // extra URLs
    videoUrl: { type: String },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
