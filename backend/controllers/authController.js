// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const generateToken = (id, role) => {
//   return jwt.sign({ id, role }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN || "7d",
//   });
// };

// // POST /api/auth/login
// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     const match = await user.matchPassword(password);
//     if (!match) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     if (!user.isActive) {
//       return res.status(403).json({ message: "User is deactivated" });
//     }
//     const token = generateToken(user._id, user.role);
//     res.json({
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Utility route to create initial admin (for development)
// const seedAdmin = async (req, res) => {
//   try {
//     const existing = await User.findOne({ email: "admin@artpress.com" });
//     if (existing) {
//       return res.json({ message: "Admin already exists" });
//     }
//     const admin = await User.create({
//       name: "Super Admin",
//       email: "admin@artpress.com",
//       password: "Admin@123",
//       role: "admin",
//     });
//     res.json({ message: "Admin created", admin });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { login, seedAdmin };

// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const generateToken = (id, role) => {
//   return jwt.sign({ id, role }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN || "7d",
//   });
// };

// // LOGIN
// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ message: "Invalid credentials" });

//     const match = await user.matchPassword(password);
//     if (!match) return res.status(401).json({ message: "Invalid credentials" });

//     if (!user.isActive)
//       return res.status(403).json({ message: "User is deactivated" });

//     const token = generateToken(user._id, user.role);
//     res.json({
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // AUTO ADMIN SEED (ENV se data lega)
// const seedAdmin = async (req, res) => {
//   try {
//     const adminEmail = process.env.ADMIN_EMAIL;
//     const adminPass = process.env.ADMIN_PASSWORD;
//     const adminName = process.env.ADMIN_NAME || "Admin";
//     const adminRole = process.env.ADMIN_ROLE || "admin";

//     const existing = await User.findOne({ email: adminEmail });

//     if (existing) return res.json({ message: "Admin already exists" });

//     const admin = await User.create({
//       name: adminName,
//       email: adminEmail,
//       password: adminPass,
//       role: adminRole,
//     });

//     res.json({ message: "Admin created successfully", admin });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { login, seedAdmin };


const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await user.matchPassword(password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    if (!user.isActive)
      return res.status(403).json({ message: "User is deactivated" });

    const token = generateToken(user._id, user.role);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// AUTO ADMIN SEED (ENV se data lega)
const seedAdmin = async (req, res) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPass = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME ;
    const adminRole = process.env.ADMIN_ROLE ;

    const existing = await User.findOne({ email: adminEmail });

    if (existing) return res.json({ message: "Admin already exists" });

    const admin = await User.create({
      name: adminName,
      email: adminEmail,
      password: adminPass,
      role: adminRole,
    });

    res.json({ message: "Admin created successfully", admin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { login, seedAdmin };

