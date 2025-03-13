const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const coursesRoutes = require ('./endPoints/courses');
const app = express();
const port = process.env.PORT;

//middleware
app.use(express.json());
app.use('/api', coursesRoutes);


//routes 
app.get('/', (req, res) => {
  res.send('Welcome to my api');
});


//mongo db connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));



app.listen(port, () => {
  console.log('Server is running on port', port);
});