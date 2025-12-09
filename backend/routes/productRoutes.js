// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const Product = require("../models/Product");
// const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, path.join(__dirname, "..", "uploads"));
//   },
//   filename(req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// // Public: list products
// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.find({ isActive: true }).populate("category");
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Public: product detail
// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id).populate("category");
//     if (!product) return res.status(404).json({ message: "Not found" });
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Admin / Manager: create
// router.post(
//   "/",
//   protect,
//   authorizeRoles("admin", "manager"),
//   upload.single("image"),
//   async (req, res) => {
//     try {
//       const body = req.body;
//       const productData = {
//         name: body.name,
//         description: body.description,
//         category: body.category,
//         pricePerUnit: body.pricePerUnit,
//         minQty: body.minQty || 1,
//         maxQty: body.maxQty || 10000,
//         options: body.options ? body.options.split(",").map((o) => o.trim()) : [],
//       };
//       if (req.file) {
//         productData.imageUrl = `/uploads/${req.file.filename}`;
//       }
//       const product = await Product.create(productData);
//       res.status(201).json(product);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   }
// );

// // Admin / Manager: update
// router.put(
//   "/:id",
//   protect,
//   authorizeRoles("admin", "manager"),
//   upload.single("image"),
//   async (req, res) => {
//     try {
//       const body = req.body;
//       const updateData = {
//         name: body.name,
//         description: body.description,
//         category: body.category,
//         pricePerUnit: body.pricePerUnit,
//         minQty: body.minQty,
//         maxQty: body.maxQty,
//         isActive: body.isActive,
//       };
//       if (body.options) {
//         updateData.options = body.options.split(",").map((o) => o.trim());
//       }
//       if (req.file) {
//         updateData.imageUrl = `/uploads/${req.file.filename}`;
//       }
//       const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
//         new: true,
//       });
//       res.json(product);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   }
// );

// // Admin / Manager: delete
// router.delete(
//   "/:id",
//   protect,
//   authorizeRoles("admin", "manager"),
//   async (req, res) => {
//     try {
//       await Product.findByIdAndDelete(req.params.id);
//       res.json({ message: "Product deleted" });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   }
// );

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const Product = require("../models/Product");
// const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, path.join(__dirname, "..", "uploads"));
//   },
//   filename(req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// // ---------- PUBLIC ROUTES ----------

// // GET /api/products
// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.find({ isActive: true }).populate(
//       "category"
//     );
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // GET /api/products/:id
// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id).populate("category");
//     if (!product) return res.status(404).json({ message: "Not found" });
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // ---------- PROTECTED ROUTES (Admin / Manager) ----------

// // POST /api/products
// // fields: name, description, category, pricePerUnit, minQty, maxQty, options, videoUrl, extraImages
// // file: image
// router.post(
//   "/",
//   protect,
//   authorizeRoles("admin", "manager"),
//   upload.single("image"),
//   async (req, res) => {
//     try {
//       const body = req.body;

//       const productData = {
//         name: body.name,
//         description: body.description,
//         category: body.category,
//         pricePerUnit: Number(body.pricePerUnit),
//         minQty: body.minQty ? Number(body.minQty) : 1,
//         maxQty: body.maxQty ? Number(body.maxQty) : 10000,
//         options: body.options
//           ? body.options
//               .split(",")
//               .map((o) => o.trim())
//               .filter(Boolean)
//           : [],
//         videoUrl: body.videoUrl || "",
//         extraImages: body.extraImages
//           ? body.extraImages
//               .split(",")
//               .map((u) => u.trim())
//               .filter(Boolean)
//           : [],
//       };

//       if (req.file) {
//         productData.imageUrl = `/uploads/${req.file.filename}`;
//       }

//       const product = await Product.create(productData);
//       res.status(201).json(product);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: err.message });
//     }
//   }
// );

// // PUT /api/products/:id
// router.put(
//   "/:id",
//   protect,
//   authorizeRoles("admin", "manager"),
//   upload.single("image"),
//   async (req, res) => {
//     try {
//       const body = req.body;

//       const updateData = {
//         name: body.name,
//         description: body.description,
//         category: body.category,
//         pricePerUnit: body.pricePerUnit ? Number(body.pricePerUnit) : undefined,
//         minQty: body.minQty ? Number(body.minQty) : undefined,
//         maxQty: body.maxQty ? Number(body.maxQty) : undefined,
//         videoUrl: body.videoUrl,
//       };

//       if (body.options !== undefined) {
//         updateData.options = body.options
//           ? body.options
//               .split(",")
//               .map((o) => o.trim())
//               .filter(Boolean)
//           : [];
//       }

//       if (body.extraImages !== undefined) {
//         updateData.extraImages = body.extraImages
//           ? body.extraImages
//               .split(",")
//               .map((u) => u.trim())
//               .filter(Boolean)
//           : [];
//       }

//       if (body.isActive !== undefined) {
//         // "true"/"false" string from form
//         updateData.isActive =
//           body.isActive === "true" || body.isActive === true;
//       }

//       if (req.file) {
//         updateData.imageUrl = `/uploads/${req.file.filename}`;
//       }

//       const product = await Product.findByIdAndUpdate(
//         req.params.id,
//         updateData,
//         {
//           new: true,
//         }
//       );

//       if (!product) {
//         return res.status(404).json({ message: "Product not found" });
//       }

//       res.json(product);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: err.message });
//     }
//   }
// );

// // DELETE /api/products/:id
// router.delete(
//   "/:id",
//   protect,
//   authorizeRoles("admin", "manager"),
//   async (req, res) => {
//     try {
//       await Product.findByIdAndDelete(req.params.id);
//       res.json({ message: "Product deleted" });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   }
// );

// module.exports = router;

// backend/routes/productRoutes.js

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const Product = require("../models/Product");
// const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, path.join(__dirname, "..", "uploads"));
//   },
//   filename(req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// // ---------- PUBLIC ROUTES ----------

// // GET /api/products
// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.find({ isActive: true }).populate(
//       "category"
//     );
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // GET /api/products/:id
// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id).populate("category");
//     if (!product) return res.status(404).json({ message: "Not found" });
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // ---------- PROTECTED ROUTES (Admin / Manager) ----------

// // POST /api/products
// router.post(
//   "/",
//   protect,
//   authorizeRoles("admin", "manager"),
//   upload.single("image"),
//   async (req, res) => {
//     try {
//       const body = req.body;

//       const productData = {
//         name: body.name,
//         description: body.description,
//         category: body.category,
//         // ✅ optional price
//         pricePerUnit: body.pricePerUnit ? Number(body.pricePerUnit) : 0,
//         minQty: body.minQty ? Number(body.minQty) : 1,
//         maxQty: body.maxQty ? Number(body.maxQty) : 10000,
//         options: body.options
//           ? body.options
//               .split(",")
//               .map((o) => o.trim())
//               .filter(Boolean)
//           : [],
//         videoUrl: body.videoUrl || "",
//         extraImages: body.extraImages
//           ? body.extraImages
//               .split(",")
//               .map((u) => u.trim())
//               .filter(Boolean)
//           : [],
//       };

//       if (req.file) {
//         productData.imageUrl = `/uploads/${req.file.filename}`;
//       }

//       const product = await Product.create(productData);
//       res.status(201).json(product);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: err.message });
//     }
//   }
// );

// // PUT /api/products/:id
// router.put(
//   "/:id",
//   protect,
//   authorizeRoles("admin", "manager"),
//   upload.single("image"),
//   async (req, res) => {
//     try {
//       const body = req.body;

//       const updateData = {
//         name: body.name,
//         description: body.description,
//         category: body.category,
//         // ✅ sirf tab update karenge jab value aaye
//         pricePerUnit:
//           body.pricePerUnit !== undefined && body.pricePerUnit !== ""
//             ? Number(body.pricePerUnit)
//             : undefined,
//         minQty: body.minQty ? Number(body.minQty) : undefined,
//         maxQty: body.maxQty ? Number(body.maxQty) : undefined,
//         videoUrl: body.videoUrl,
//       };

//       if (body.options !== undefined) {
//         updateData.options = body.options
//           ? body.options
//               .split(",")
//               .map((o) => o.trim())
//               .filter(Boolean)
//           : [];
//       }

//       if (body.extraImages !== undefined) {
//         updateData.extraImages = body.extraImages
//           ? body.extraImages
//               .split(",")
//               .map((u) => u.trim())
//               .filter(Boolean)
//           : [];
//       }

//       if (body.isActive !== undefined) {
//         updateData.isActive =
//           body.isActive === "true" || body.isActive === true;
//       }

//       if (req.file) {
//         updateData.imageUrl = `/uploads/${req.file.filename}`;
//       }

//       const product = await Product.findByIdAndUpdate(
//         req.params.id,
//         updateData,
//         { new: true }
//       );

//       if (!product) {
//         return res.status(404).json({ message: "Product not found" });
//       }

//       res.json(product);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: err.message });
//     }
//   }
// );

// // DELETE /api/products/:id
// router.delete(
//   "/:id",
//   protect,
//   authorizeRoles("admin", "manager"),
//   async (req, res) => {
//     try {
//       await Product.findByIdAndDelete(req.params.id);
//       res.json({ message: "Product deleted" });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   }
// );

// module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Product = require("../models/Product");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// ✅ Make sure uploads folder exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ---------- PUBLIC ROUTES ----------

// GET /api/products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).populate(
      "category"
    );
    res.json(products);
  } catch (err) {
    console.error("GET /api/products error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (err) {
    console.error("GET /api/products/:id error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ---------- PROTECTED ROUTES ----------

// POST /api/products
router.post(
  "/",
  protect,
  authorizeRoles("admin", "manager"),
  upload.single("image"),
  async (req, res) => {
    try {
      const body = req.body;
      console.log("POST /api/products body:", body);

      if (!body.name || !body.category) {
        return res
          .status(400)
          .json({ message: "Name and category are required" });
      }

      const productData = {
        name: body.name,
        description: body.description,
        category: body.category,
        // ✅ optional price
        pricePerUnit:
          body.pricePerUnit !== undefined && body.pricePerUnit !== ""
            ? Number(body.pricePerUnit)
            : 0,
        minQty: body.minQty ? Number(body.minQty) : 1,
        maxQty: body.maxQty ? Number(body.maxQty) : 10000,
        options: body.options
          ? body.options
              .split(",")
              .map((o) => o.trim())
              .filter(Boolean)
          : [],
        videoUrl: body.videoUrl || "",
        extraImages: body.extraImages
          ? body.extraImages
              .split(",")
              .map((u) => u.trim())
              .filter(Boolean)
          : [],
      };

      if (req.file) {
        productData.imageUrl = `/uploads/${req.file.filename}`;
      }

      const product = await Product.create(productData);
      res.status(201).json(product);
    } catch (err) {
      console.error("POST /api/products error:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

// PUT /api/products/:id
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  upload.single("image"),
  async (req, res) => {
    try {
      const body = req.body;
      console.log("PUT /api/products/:id body:", body);

      const updateData = {
        name: body.name,
        description: body.description,
        category: body.category,
        pricePerUnit:
          body.pricePerUnit !== undefined && body.pricePerUnit !== ""
            ? Number(body.pricePerUnit)
            : undefined,
        minQty: body.minQty ? Number(body.minQty) : undefined,
        maxQty: body.maxQty ? Number(body.maxQty) : undefined,
        videoUrl: body.videoUrl,
      };

      if (body.options !== undefined) {
        updateData.options = body.options
          ? body.options
              .split(",")
              .map((o) => o.trim())
              .filter(Boolean)
          : [];
      }

      if (body.extraImages !== undefined) {
        updateData.extraImages = body.extraImages
          ? body.extraImages
              .split(",")
              .map((u) => u.trim())
              .filter(Boolean)
          : [];
      }

      if (body.isActive !== undefined) {
        updateData.isActive =
          body.isActive === "true" || body.isActive === true;
      }

      if (req.file) {
        updateData.imageUrl = `/uploads/${req.file.filename}`;
      }

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(product);
    } catch (err) {
      console.error("PUT /api/products/:id error:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

// DELETE /api/products/:id
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: "Product deleted" });
    } catch (err) {
      console.error("DELETE /api/products/:id error:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

module.exports = router;
