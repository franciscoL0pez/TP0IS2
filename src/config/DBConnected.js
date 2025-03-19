const mongoose = require("mongoose");
require("dotenv").config();

const {DATABASE_NAME, DATABASE_HOST } = process.env;

const MONGODB_URI = `mongodb://localhost:${DATABASE_HOST}/${DATABASE_NAME}`;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
