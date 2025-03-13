const mongoose = require('mongoose');
const coursesSchema = mongoose.Schema({

    courseName: {
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true
    }


});

module.exports = mongoose.model('Courses', coursesSchema);

