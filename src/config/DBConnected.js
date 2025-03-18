const mongoose = require("mongoose");
require("dotenv").config();

const { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD } = process.env;

const MONGODB_URI = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}/?retryWrites=true&w=majority&appName=Cluster0`;

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