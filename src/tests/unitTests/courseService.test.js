// unit test about courseService

const courseService = require("../../services/courseService");
const courseRepository = require("../../repositories/courseRepository");

jest.mock("../../repositories/courseRepository");


describe("courseService tests", () => {

    beforeEach(() => {
        jest.clearAllMocks(); // Limpia los mocks antes de cada test
      });


    test("getCourseById returns course", async () => {
        courseRepository.getCourseById.mockResolvedValue({title: "Java", description: "Java course"});
        const course = await courseService.getCourseById(1);
        expect(course).toEqual({title: "Java", description: "Java course"});
    }
    );

    test("getAllCourses returns list", async () => {
        courseRepository.getAllCourses.mockResolvedValue([{title: "Java", description: "Java course"}]);
        const courses = await courseService.getAllCourses();
        expect(courses).toEqual([{title: "Java", description: "Java course"}]);
    }
    );

    test("createCourse saves course", async () => {
        courseRepository.createCourse.mockResolvedValue({title: "Java", description: "Java course"});
        const course = await courseService.createCourse({title: "Java", description: "Java course"});
        expect(course).toEqual({title: "Java", description: "Java course"});
        
    }
    );

    test("deleteCourseById removes course", async () => {
        courseRepository.deleteCourseById.mockResolvedValue({title: "Java", description: "Java course"});
        const course = await courseService.deleteCourseById(1);
        expect(course).toEqual({title: "Java", description: "Java course"});
    }
    );

});

