const courseRepository = require("../repositories/courseRepository");

/**
 * Creates a new course in the repository.
 *
 * @async
 * @function createCourse
 * @param {Object} courseData - The course data.
 * @param {string} courseData.title - The title of the course.
 * @param {string} courseData.description - The description of the course.
 * @returns {Promise<Object>} The created course object.
 * @throws {Error} If title or description is missing.
 */
const createCourse = async ({ title, description }) => {
  if (!title || !description) {
    throw new Error("Title and description are required");
  }
  return await courseRepository.createCourse({ title, description });
};

/**
 * Retrieves all courses from the repository.
 *
 * @async
 * @function getAllCourses
 * @returns {Promise<Array>} A promise that resolves to an array of course objects.
 */

const getAllCourses = async () => {
  return await courseRepository.getAllCourses();
};

/**
 * Retrieves a course by its ID from the repository.
 *
 * @async
 * @function getCourseById
 * @param {string} id - The ID of the course to retrieve.
 * @returns {Promise<Object|null>} A promise that resolves to the course object, or `null` if not found.
 */

const getCourseById = async (id) => {
  return await courseRepository.getCourseById(id);
};

/**
 * Deletes a course by its ID from the repository.
 *
 * @async
 * @function deleteCourseById
 * @param {string} id - The ID of the course to delete.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the course was deleted, or `false` if not found.
 */
const deleteCourseById = async (id) => {
  return await courseRepository.deleteCourseById(id);
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  deleteCourseById,
};
