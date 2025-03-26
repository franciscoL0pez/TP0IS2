const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const coursesSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Courses", coursesSchema);
