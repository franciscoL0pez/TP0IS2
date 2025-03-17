const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const courseRoutes = require("./routes/courseRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/api", courseRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

// Only connect to db and start server if not running tests
// For effect jest set this env variable
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB");
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error("Database connection error:", err));
}

module.exports = { app, mongoose }; 
