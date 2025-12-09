// const express = require("express");
// const router = express.Router();
// const { login, seedAdmin } = require("../controllers/authController");

// router.post("/login", login);

// // Dev only: create default admin
// router.get("/seed-admin", seedAdmin);

// module.exports = router;

// const express = require("express");
// const { login, seedAdmin } = require("../controllers/authController");
// const router = express.Router();

// router.post("/login", login);
// router.get("/seed-admin", seedAdmin); // first time run only

// module.exports = router;


const express = require("express");
const { login, seedAdmin } = require("../controllers/authController");
const router = express.Router();

router.post("/login", login);
router.get("/seed-admin", seedAdmin); // first time run only

module.exports = router;
