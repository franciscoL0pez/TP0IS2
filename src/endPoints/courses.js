const express = require("express");
const courseSchema = require("../models/courses");
const router = express.Router();
const createErrorResponse = require("../utils/errorResponse");
const mongoose = require("mongoose");
const logger = require("../utils/logger");

// create course
router.post("/courses", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      logger.error("Course creation failed. Title and description are mandatory");
      return res
        .status(400)
        .json(
          createErrorResponse(
            400,
            "Bad Request",
            "Title and description are required",
            "/courses"
          )
        );
    }

    const course = new courseSchema({ title, description });
    const savedCourse = await course.save();

    logger.info(`Course created: ${course.id}, ${course.title}`);

    res.status(201).json({
      data: {
        id: savedCourse._id,
        title: savedCourse.title,
        description: savedCourse.description,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json(
        createErrorResponse(
          500,
          "Internal Server Error",
          "An unexpected error occurred while processing your request.",
          "/courses"
        )
      );
  }
});

// get all courses
router.get("/courses", async (req, res) => {
  try {
    const courses = await courseSchema.find();

    // i dont know this is necessary...
    if (courses.length === 0) {
      logger.error("No courses available");
      return res
        .status(404)
        .json(
          createErrorResponse(
            404,
            "Course Not Found",
            "No courses available",
            "/courses"
          )
        );
    }

    logger.info("Successfully retrieved all courses");

    res.status(200).json({
      data: courses.map((course) => ({
        id: course._id,
        title: course.title,
        description: course.description,
      })),
    });
  } catch (err) {
    res
      .status(500)
      .json(
        createErrorResponse(
          500,
          "Internal Server Error",
          "An unexpected error occurred while processing your request.",
          "/courses"
        )
      );
  }
});

module.exports = router;

// get course by id
router.get("/courses/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.error(`Invalid course ID: ${id}`);
      return res
        .status(404)
        .json(
          createErrorResponse(
            400,
            "Bad Request",
            `The ID ${id} is invalid.`,
            `/courses/${id}`
          )
        );
    }

    const course = await courseSchema.findById(id);

    if (!course) {
      logger.error(`Course not found, id: ${id}`);
      const id = req.params.id;
      return res
        .status(404)
        .json(
          createErrorResponse(
            404,
            "Course not found",
            `The course with ID ${id} was not found.`,
            `/courses/${id}`
          )
        );
    }
    logger.info(`Course found, id: ${id}`);

    res.status(200).json({
      data: {
        id: course._id,
        title: course.title,
        description: course.description,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json(
        createErrorResponse(
          500,
          "Internal Server Error",
          "An unexpected error occurred while processing your request.",
          "/courses"
        )
      );
  }
});

// delete course by id
router.delete("/courses/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // invalid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.error(`Invalid course ID: ${id}`);
      return res
        .status(404)
        .json(
          createErrorResponse(
            400,
            "Bad Request",
            `The ID ${id} is invalid.`,
            `/courses/${id}`
          )
        );
    }

    // search if id exists in db
    const course = await courseSchema.findById(id);
    if (!course) {
      logger.error(`Course not found, id: ${id}`);
      return res
        .status(404)
        .json(
          createErrorResponse(
            404,
            "Course Not Found",
            `The course with ID ${id} was not found.`,
            `/courses/${id}`
          )
        );
    }

    logger.info(`Course deleted, id: ${id}`);
    const deletedCourse = await courseSchema.deleteOne({ _id: id });

    res.status(204).json({});
  } catch (err) {
    res
      .status(500)
      .json(
        createErrorResponse(
          500,
          "Internal Server Error",
          "An unexpected error occurred while processing your request.",
          "/courses"
        )
      );
  }
});

module.exports = router;
