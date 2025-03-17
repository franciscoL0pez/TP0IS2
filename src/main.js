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

const {
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_PASSWORD,

} = process.env;

const MONGODB_URI = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}/?retryWrites=true&w=majority&appName=Cluster0`;

// Conectar a la base de datos y levantar el servidor solo si no estamos en entorno de test
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB");
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
      console.error("Database connection error:", err);
      process.exit(1);
    });
}

module.exports = { app, mongoose };
