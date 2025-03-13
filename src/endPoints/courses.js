const express = require("express");
const courseSchema = require("../models/courses");
const router = express.Router();
const createErrorResponse = require("../utils/errorResponse");


// create course
router.post("/courses", async (req, res) => {
    try {
      const { courseName, description } = req.body;
  
      if (!courseName || !description) {
        return res.status(400).json(createErrorResponse(400, "Bad Request", "Title and description are required"));
      }
  
      const course = new courseSchema({ courseName, description });
      const savedCourse = await course.save();
  
      res.status(201).json({
        data: {
          id: savedCourse._id,
          courseName: savedCourse.courseName,
          description: savedCourse.description
        }
      });
  
    } catch (err) {
      res.status(500).json(createErrorResponse(500, "Internal Server Error", err.message));
    }
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