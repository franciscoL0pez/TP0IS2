const courseService = require('../services/courseService');
const createErrorResponse = require('../utils/errorResponse');
const logger = require('../utils/logger');

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
    res.status(400).json(
      createErrorResponse(400, 'Bad Request', err.message, '/courses')
    );
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();

    if (courses.length === 0) {
      logger.error('No courses available');
      return res.status(404).json(createErrorResponse(404, 'Course Not Found', 'No courses available', '/courses'));
    }

    logger.info('Successfully retrieved all courses');
    res.status(200).json({
      data: courses.map((course) => ({
        id: course._id,
        title: course.title,
        description: course.description,
      })),
    });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json(createErrorResponse(500, 'Internal Server Error', 'An unexpected error occurred while processing your request.', '/courses'));
  }
};

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await courseService.getCourseById(id);

    if (!course) {
      logger.error(`Course not found, id: ${id}`);
      return res.status(404).json(createErrorResponse(404, 'Course Not Found', `The course with ID ${id} was not found.`, `/courses/${id}`));
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
    res.status(500).json(createErrorResponse(500, 'Internal Server Error', 'An unexpected error occurred while processing your request.', '/courses'));
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCourse = await courseService.deleteCourseById(id);

    if (!deletedCourse) {
      
      logger.error(`Course not found, id: ${id}`);
      return res.status(404).json(createErrorResponse(404, 'Course Not Found', `The course with ID ${id} was not found.`, `/courses/${id}`));
    }

    logger.info(`Course deleted, id: ${id}`);
    res.status(204).json({});
  } catch (err) {
    logger.error(err.message);
    res.status(500).json(createErrorResponse(500, 'Internal Server Error', 'An unexpected error occurred while processing your request.', '/courses'));
  }
};

module.exports = { createCourse, getCourses, getCourseById, deleteCourse };