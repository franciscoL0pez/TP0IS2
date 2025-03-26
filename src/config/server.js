const express = require("express");
const courseRoutes = require("../routes/courseRoutes");
const dotenv = require("dotenv");
const fs = require("fs");
const app = express();

const envFile =
  process.env.ENVIRONMENT === "production"
    ? ".env.production"
    : ".env.development";

if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
} else {
  console.warn(
    ` Archivo de entorno '${envFile}' no encontrado. Usando variables de entorno del sistema.`
  );
}

app.use(express.json());
app.use(courseRoutes);

app.get("/", (_, res) => {
  res.send("Welcome to my API");
});

module.exports = app;
