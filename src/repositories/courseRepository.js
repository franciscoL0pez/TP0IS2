const Course = require("../models/courses");

/**
 * Creates a new course.
 *
 * @async
 * @function createCourse
 * @param {Object} courseData - The course data.
 * @param {string} courseData.title - The title of the course.
 * @param {string} courseData.description - The description of the course.
 * @returns {Promise<Object>} The created course.
 */
const createCourse = async (courseData) => {
  const course = new Course(courseData);
  return await course.save();
};

/**
 * Retrieves all courses.
 *
 * @async
 * @function getAllCourses
 * @returns {Promise<Array<Object>>} An array of all courses.
 */
const getAllCourses = async () => {
  return await Course.find();
};

/**
 * Retrieves a course by  ID.
 *
 * @async
 * @function getCourseById
 * @param {string} id - The ID of the course.
 * @returns {Promise<Object>} The course.
 */

const getCourseById = async (id) => {
  return await Course.findById(id);
};

/**
 * Deletes a course by ID.
 * 
 * @async
 * @function deleteCourseById
 * @param {string} id - The ID of the course.
 * @returns {boolean} True if the course was deleted; otherwise, false.
 */
const deleteCourseById = async (id) => {
  const result = await Course.deleteOne({ _id: id });
  return result.deletedCount > 0;
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  deleteCourseById,
};
