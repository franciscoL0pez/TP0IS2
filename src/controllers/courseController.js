const courseService = require("../services/courseService");
const createErrorResponse = require("../utils/errorResponse");
const logger = require("../utils/logger");
const validID = require("../utils/validID");
/**
 * Handles the creation of a new course.
 *
 * @async
 * @function createCourse
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The request body containing course data.
 * @param {string} req.body.title - The title of the course.
 * @param {string} req.body.description - The description of the course.
 * @param {Object} res - Express response object.
 * @returns {void} Sends a JSON response with the created course data or an error message.
 * @throws {Error} If an error occurs, logs the error and returns a 400 Bad Request response.
 */

const createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    const course = await courseService.createCourse({ title, description });

    logger.info(`Course created: ${course._id}, ${course.title}`);

    res.status(201).json({
      data: {
        id: course._id,
        title: course.title,
        description: course.description,
      },
    });
  } catch (err) {
    logger.error(err.message);
    res
      .status(400)
      .json(createErrorResponse(400, "Bad Request", err.message, "/courses"));
  }
};

/**
 * Handles the retrieval of all courses.
 *
 * @async
 * @function getCourses
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void} Sends a JSON response with all courses or an error message.
 * @throws {Error} If no courses are found, logs the error and returns a 404 Not Found response.
 * @throws {Error} If an unexpected error occurs, logs the error and returns a 500 Internal Server Error response.
 */

const getCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();

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
    logger.error(err.message);
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
};

/**
 * Retrieves a course by ID.
 * 
 * @async
 * @function getCourseById
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void} Sends a JSON response with the course data or an error message.
 * @throws {Error} If the course ID is invalid, logs the error and returns a 400 Bad Request response.
 * @throws {Error} If the course is not found, logs the error and returns a 404 Not Found response.
 * @throws {Error} If an unexpected error occurs, logs the error and returns a 500 Internal Server Error response.
 */
const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!validID(id)) {
      logger.error(`Invalid ID: ${id}`);
      return res
        .status(400)
        .json(
          createErrorResponse(
            400,
            "Bad Request",
            `Invalid ID: ${id}`,
            "/courses"
          )
        );
    }

    const course = await courseService.getCourseById(id);

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

    logger.info(`Course found, id: ${id}`);
    res.status(200).json({
      data: {
        id: course._id,
        title: course.title,
        description: course.description,
      },
    });
  } catch (err) {
    logger.error(err.message);
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
};

/**
 * Deletes a course by ID.
 * 
 * @async
 * @function deleteCourse
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void} Sends a 204 No Content response or an error message.
 * @throws {Error} If the course ID is invalid, logs the error and returns a 400 Bad Request response.
 * @throws {Error} If the course is not found, logs the error and returns a 404 Not Found response.
 * @throws {Error} If an unexpected error occurs, logs the error and returns a 500 Internal Server Error response.
 */
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    if (!validID(id)) {
      logger.error(`Invalid ID: ${id}`);
      return res
        .status(400)
        .json(
          createErrorResponse(
            400,
            "Bad Request",
            `Invalid ID: ${id}`,
            "/courses"
          )
        );
    }

    const deletedCourse = await courseService.deleteCourseById(id);

    if (!deletedCourse) {
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
    res.status(204).json({});
  } catch (err) {
    logger.error(err.message);
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
};

module.exports = { createCourse, getCourses, getCourseById, deleteCourse };
