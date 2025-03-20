const mongoose = require("mongoose");
require("dotenv").config();

const {DATABASE_NAME, DATABASE_HOST,DATABASE_PORT } = process.env;


const MONGODB_URI =
  process.env.ENVIRONMENT === 'production'
    ? `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`
    : `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;


/**
 * Establishes a connection to the MongoDB database.
 * 
 * @async
 * @function connectDB
 * @throws {Error} If there is a database connection error, it logs the error and terminates the process.
 */
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
