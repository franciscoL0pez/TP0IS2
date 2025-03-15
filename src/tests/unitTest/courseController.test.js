// Only unit test, use mocks to simulate the behavior of the dependencies

const courseController = require("../../controllers/courseController");
const courseService = require("../../services/courseService");
const createErrorResponse = require("../../utils/errorResponse");
const logger = require("../../utils/logger");

jest.mock("../../services/courseService"); // Mock del servicio
jest.mock("../../utils/errorResponse"); // Mock del manejador de errores
jest.mock("../../utils/logger"); // Mock del logger

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
