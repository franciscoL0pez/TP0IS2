// Only unit test, use mocks to simulate the behavior of the dependencies

const courseController = require("../../controllers/courseController");
const courseService = require("../../services/courseService");
const createErrorResponse = require("../../utils/errorResponse");
const logger = require("../../utils/logger");

// Mocks
jest.mock("../../services/courseService"); 
jest.mock("../../utils/errorResponse"); 
jest.mock("../../utils/logger");

// Create a course tests
describe("Course Controller - createCourse", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test

    req = {
      body: {
        title: "Test Course",
        description: "Test Description",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test("Create a course and response with code 201", async () => {
    const mockCourse = {
      _id: "12345",
      title: "Test Course",
      description: "Test Description",
    };

    courseService.createCourse.mockResolvedValue(mockCourse); // Simula respuesta exitosa

    await courseController.createCourse(req, res);

    expect(courseService.createCourse).toHaveBeenCalledWith({
      title: "Test Course",
      description: "Test Description",
    });
    expect(logger.info).toHaveBeenCalledWith(
      `Course created: ${mockCourse._id}, ${mockCourse.title}`
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      data: {
        id: mockCourse._id,
        title: mockCourse.title,
        description: mockCourse.description,
      },
    });
  });

  test("Handle errors and response with code 400", async () => {
    const mockError = new Error("Validation failed");

    courseService.createCourse.mockRejectedValue(mockError); // Simulate error response

    createErrorResponse.mockReturnValue({
      error: "Bad Request",
      message: "Validation failed",
    });

    await courseController.createCourse(req, res);

    expect(courseService.createCourse).toHaveBeenCalledWith({
      title: "Test Course",
      description: "Test Description",
    });
    expect(logger.error).toHaveBeenCalledWith(mockError.message);
    expect(createErrorResponse).toHaveBeenCalledWith(
      400,
      "Bad Request",
      "Validation failed",
      "/courses"
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Bad Request",
      message: "Validation failed",
    });
  });
});

// Get all courses tests
describe("Course Controller - getCourses", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test

    req = {};

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test("Get all courses and response with code 200", async () => {
    const mockCourses = [
      {
        _id: "12345",
        title: "Test Course 1",
        description: "Test Description 1",
      },
      {
        _id: "67890",
        title: "Test Course 2",
        description: "Test Description 2",
      },
    ];

    courseService.getAllCourses.mockResolvedValue(mockCourses); // Simulate successful response

    await courseController.getCourses(req, res);

    expect(courseService.getAllCourses).toHaveBeenCalled();
    expect(logger.info).toHaveBeenCalledWith("Successfully retrieved all courses");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: [
        {
          id: "12345",
          title: "Test Course 1",
          description: "Test Description 1",
        },
        {
          id: "67890",
          title: "Test Course 2",
          description: "Test Description 2",
        },
      ],
    });
  });

  test("Handle empty courses and response with code 404", async () => {
    courseService.getAllCourses.mockResolvedValue([]); // Simulate empty response

    createErrorResponse.mockReturnValue({
      error: "Course Not Found",
      message: "No courses available",
    });

    await courseController.getCourses(req, res);

    expect(courseService.getAllCourses).toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalledWith("No courses available");
    expect(createErrorResponse).toHaveBeenCalledWith(
      404,
      "Course Not Found",
      "No courses available",
      "/courses"
    );
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "Course Not Found",
      message: "No courses available",
    });
  });

  test("Handle errors and response with code 500", async () => {
    const mockError = new Error("Internal Server Error");

    courseService.getAllCourses.mockRejectedValue(mockError); // Simulate error response

    createErrorResponse.mockReturnValue({
      error: "Internal Server Error",
      message: "An unexpected error occurred while processing your request.",
    });

    await courseController.getCourses(req, res);

    expect(courseService.getAllCourses).toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalledWith(mockError.message);
    expect(createErrorResponse).toHaveBeenCalledWith(
      500,
      "Internal Server Error",
      "An unexpected error occurred while processing your request.",
      "/courses"
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Internal Server Error",
      message: "An unexpected error occurred while processing your request.",
    });
  });
});


