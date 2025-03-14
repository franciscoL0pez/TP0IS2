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
  return await Course.deleteOne({ _id: id });
};

module.exports = { createCourse, getAllCourses, getCourseById, deleteCourseById };
