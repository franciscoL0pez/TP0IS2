const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();

//routes 
app.get('/', (req, res) => {
  res.send('Welcome to my api');
});


//mongo db connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Server is running on port', port);
});