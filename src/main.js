const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const courseRoutes = require("./routes/courseRoutes");

// connet to mongo and start server (in the future can i divide this in two files)


const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// routes
app.use("/api", courseRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
