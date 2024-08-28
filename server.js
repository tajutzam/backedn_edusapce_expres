const express = require("express");
const connectDB = require("./config/database");
const indexRouter = require("./routes/indexRoutes");
const dotenv = require("dotenv");
const path = require("path")

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/v1/api", indexRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});