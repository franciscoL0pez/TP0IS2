const app = require("./config/server"); 
const connectDB = require("./config/DBConnected");

// Connect to the database and start the server
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server is running on port ${process.env.PORT || 8080}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);  
  });

module.exports = { app };