const dotenv = require('dotenv');
const fs = require('fs');


const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';


if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
} else {
  console.warn(` Archivo de entorno '${envFile}' no encontrado. Usando variables de entorno del sistema.`);
}

// Connect to the database and start the server
const app = require("./config/server"); 
const connectDB = require("./config/DBConnected");

console.log("The envioromente is:", process.env.NODE_ENV);
connectDB();
app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT || 8080}`);
});

module.exports = { app };