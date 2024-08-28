const express = require("express");
const router = express.Router();
const userRouter = require("./userRoutes");
const categoryRouter = require("./categoryRoutes");
const expertRouter = require("./expertRoutes");
const tutorRouter = require("./tutorRoutes");

const adminMiddleware = require("../middlewares/authMiddleware");
router.use(adminMiddleware.authenticateToken);
router.use(adminMiddleware.isAdmin);
router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/expert", expertRouter);
router.use("/tutor", tutorRouter);

module.exports = router;
