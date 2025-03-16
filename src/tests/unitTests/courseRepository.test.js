const course = require("../../models/courses");
const courseRepository = require("../../repositories/courseRepository");

jest.mock("../../models/courses"); // mock course to avoid reals calls to db

//
describe("courseRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("createCourse save and return a course", async () => {
    const mockCourseData = { title: "Python", description: "About python" };
    const mockSavedCourse = { _id: "12345", ...mockCourseData };

    course.prototype.save = jest.fn().mockResolvedValue(mockSavedCourse);

    const result = await courseRepository.createCourse(mockCourseData);

    expect(course.prototype.save).toHaveBeenCalled();
    expect(result).toEqual(mockSavedCourse);
  });

  test("getCourseById return a course", async () => {
    const mockCourseData = {
      _id: "12345",
      title: "Java course",
      description: "About java",
    };
    course.findById = jest.fn().mockResolvedValue(mockCourseData);

    const result = await courseRepository.getCourseById("12345");

    expect(course.findById).toHaveBeenCalledWith("12345");
    expect(result).toEqual(mockCourseData);
  });

  test("getAllCourses return all courses", async () => {
    const mockCourses = [
      { _id: "12345", title: "Java course", description: "About java" },
      { _id: "67890", title: "Python course", description: "About python" },
    ];
    course.find = jest.fn().mockResolvedValue(mockCourses);

    const result = await courseRepository.getAllCourses();

    expect(course.find).toHaveBeenCalled();
    expect(result).toEqual(mockCourses);
  });

  test("deleteCourseById return true when a course is deleted", async () => {
 
    course.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });
    const result = await courseRepository.deleteCourseById("12345");

    expect(course.deleteOne).toHaveBeenCalledWith({ _id: "12345" });
    expect(result).toEqual(true);
  });
});
