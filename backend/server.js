// const express = require("express");
// const cors = require("cors");
// const morgan = require("morgan");
// const dotenv = require("dotenv");
// const path = require("path");

// dotenv.config();

// const connectDB = require("./config/db");
// const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");
// const categoryRoutes = require("./routes/categoryRoutes");
// const productRoutes = require("./routes/productRoutes");
// const quoteRoutes = require("./routes/quoteRoutes");
// const contactRoutes = require("./routes/contactRoutes");
// const settingsRoutes = require("./routes/settingsRoutes");
// const logRoutes = require("./routes/logRoutes");

// const app = express();

// // DB
// connectDB();

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const corsOptions = {
//   origin: process.env.CLIENT_URL || "*",
//   credentials: true,
// };
// app.use(cors(corsOptions));

// app.use(morgan("dev"));

// // Static uploads (for artwork or images)
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Routes
// app.get("/", (req, res) => {
//   res.json({ message: "ArtPress API is running" });
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/quotes", quoteRoutes);
// app.use("/api/contact", contactRoutes);
// app.use("/api/settings", settingsRoutes);
// app.use("/api/logs", logRoutes);

// // Error handling
// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const quoteRoutes = require("./routes/quoteRoutes");
const contactRoutes = require("./routes/contactRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const logRoutes = require("./routes/logRoutes");

// 🆕 CMS related routes
const portfolioRoutes = require("./routes/portfolioRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const aboutRoutes = require("./routes/aboutRoutes");

const app = express();

// DB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: process.env.CLIENT_URL || "*",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(morgan("dev"));

// Static uploads (for artwork or images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "ArtPress API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/logs", logRoutes);

// 🆕 CMS API routes
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/services-content", serviceRoutes); // Services CMS
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/about", aboutRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
