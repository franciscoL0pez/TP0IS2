const express = require("express");
const courseSchema = require("../models/courses");
const router = express.Router();



// create course
router.post("/courses", (req, res) => {
    const course = courseSchema(req.body);
    course
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

// get all courses
router.get("/courses", (req, res) => {
    courseSchema
    .find()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

// get course by id
router.get("/courses/:id", (req, res) => {
    const {id} = req.params;
    courseSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});


// delete course by id
router.delete("/courses/:id", (req, res) => {
    const {id} = req.params;
    courseSchema
    .deleteOne({ _id : id})
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});


module.exports = router;