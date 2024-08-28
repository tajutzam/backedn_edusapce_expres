const express = require("express");
const router = express.Router();

const adminRoute = require("./adminRoutes");
const authRoute = require("./authRoutes");
const categoryController = require("../controllers/categoryController");


router.use("/admin", adminRoute);
router.use("/auth", authRoute);
router.get("/category", categoryController.findAll);
router.get("/category/:id", categoryController.findById);

module.exports = router;
