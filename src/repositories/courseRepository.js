const Course = require('../models/courses');

const createCourse = async (courseData) => {
  const course = new Course(courseData);
  return await course.save();
};

const getAllCourses = async () => {
  return await Course.find();
};

const getCourseById = async (id) => {
  return await Course.findById(id);
};

const deleteCourseById = async (id) => {
  const result = await Course.deleteOne({ _id: id });
  return result.deletedCount > 0; // Retorna true si se eliminó un curso
};

module.exports = { createCourse, getAllCourses, getCourseById, deleteCourseById };
