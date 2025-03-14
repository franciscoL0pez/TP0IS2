const courseRepository = require('../repositories/courseRepository');

const createCourse = async ({ title, description }) => {
  if (!title || !description) {
    throw new Error('Title and description are required');
  }
  return await courseRepository.createCourse({ title, description });
};

const getAllCourses = async () => {
  return await courseRepository.getAllCourses();
};

const getCourseById = async (id) => {
  return await courseRepository.getCourseById(id);
};

const deleteCourseById = async (id) => {
  return await courseRepository.deleteCourseById(id);
};

module.exports = { createCourse, getAllCourses, getCourseById, deleteCourseById };
