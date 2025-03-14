const express = require('express');
const courseController = require('../controllers/courseController');
const router = express.Router();

router.post('/courses', courseController.createCourse);
router.get('/courses', courseController.getCourses);
router.get('/courses/:id', courseController.getCourseById);
router.delete('/courses/:id', courseController.deleteCourse);

module.exports = router;
