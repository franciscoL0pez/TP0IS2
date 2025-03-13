const express = require("express");
const courseSchema = require("../models/courses");
const router = express.Router();
const createErrorResponse = require("../utils/errorResponse");
const mongoose = require('mongoose');

// create course
router.post("/courses", async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json(createErrorResponse(0, "Bad Request", "Title and description are required"));
        }

        const course = new courseSchema({ title, description });
        const savedCourse = await course.save();

        res.status(201).json({
            data: {
                id: savedCourse._id,
                title: savedCourse.title,
                description: savedCourse.description
            }
        });

    } catch (err) {
        res.status(500).json(createErrorResponse(0, "Internal Server Error", err.message));
    }
});



// get all courses 
router.get("/courses", async (req, res) => {
    try {
        const courses = await courseSchema.find();

        if (courses.length === 0) {
            return res.status(404).json(createErrorResponse(404, "Not Found", "No courses available"));
        }

        res.status(200).json({
            data: courses.map(course => ({
                id: course._id,
                title: course.title,
                description: course.description
            }))
        });

    } catch (err) {
        res.status(500).json(createErrorResponse(500, "Internal Server Error", err.message));
    }
});

module.exports = router;



// get course by id
router.get("/courses/:id", async (req, res) => {
    try {
        const { id } = req.params;


        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json(createErrorResponse(0, "Bad Request", "Invalid course ID"));
        }

        const course = await courseSchema.findById(id);

        if (!course) {
            return res.status(404).json(createErrorResponse(404, "Not Found", "Course not found"));
        }

        res.status(200).json({
            data: {
                id: course._id,
                title: course.title,
                description: course.description
            }
        });

    } catch (err) {
        res.status(500).json(createErrorResponse(500, "Internal Server Error", err.message));
    }
});

// delete course by id
router.delete("/courses/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // invalid id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json(createErrorResponse(0, "Bad Request", "Invalid course ID"));
        }

        // search if id exists in db
        const course = await courseSchema.findById(id);
        if (!course) {
            return res.status(404).json(createErrorResponse(0, "Not Found", "Course not found"));
        }

        const deletedCourse = await courseSchema.deleteOne({ _id: id });

   
   
        res.status(204).json({});

    } catch (err) {
        res.status(500).json(createErrorResponse(0, "Internal Server Error", err.message));
    }
});


/*
router.delete("/courses/:id", (req, res) => {
    const { id } = req.params;
    courseSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});



module.exports = router;
*/