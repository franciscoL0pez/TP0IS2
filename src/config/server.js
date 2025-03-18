const express = require("express");
const courseRoutes = require("../routes/courseRoutes");

const app = express();


app.use(express.json());


app.use("/api", courseRoutes);

app.get("/", (_, res) => {
  res.send("Welcome to my API");
});


module.exports = app;