import mongoose from "mongoose";

// connect with classconnect DB, this DB it's run in a local mongo server
await mongoose.connect("mongodb://localhost:27017/classconnect");

const CourseSchema = new mongoose.Schema({ id: String, message: String , description: String });
const Course = mongoose.model("Course", CourseSchema);


await Course.create({ id: "1", message: "Curso de MongoDB", description: "this course..." });


const courses = await Course.find();
console.log(courses);
