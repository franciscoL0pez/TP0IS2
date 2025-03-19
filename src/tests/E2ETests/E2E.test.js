const request = require("supertest");
const mongoose = require("mongoose");
const { app } = require("../../main");
const course = require("../../models/courses");
const connectDB = require("../../config/DBConnected");


describe("E2E Tests - course API", () => {
  let session; 

  beforeAll(async () => {
    await connectDB();
  });

  beforeEach(async () => {
    session = await mongoose.startSession(); 
    session.startTransaction(); 
  });

  afterEach(async () => {
    await session.abortTransaction(); 
    session.endSession();
  });

  test("Create a course return 201", async () => {
    const response = await request(app)
      .post("/api/courses")
      .send({ title: "Node.js", description: "Learn Node.js" });

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data.title).toBe("Node.js");
  });

  test("Create a course without title return 400", async () => {
    const response = await request(app)
      .post("/api/courses")
      .send({ description: "Learn Node.js" });

    expect(response.body).toEqual({
      type: "about:blank",
      title: "Bad Request",
      status: 400,
      detail: "Title and description are required",
      instance: "/courses",
    });
  });

  test("Get all courses should return 200", async () => {
    await course.create({ title: "Node.js", description: "Learn Node.js" });

    const response = await request(app).get("/api/courses");

    expect(response.status).toBe(200);
    expect(response.body.data[0].title).toBe("Node.js");
    expect(response.body.data[0].description).toBe("Learn Node.js");
  });

  test("Get a course with id return 200", async () => {
    const courseCreated = await course.create({
      title: "Node.js",
      description: "Learn Node.js",
    });

    const response = await request(app).get(`/api/courses/${courseCreated.id}`);

    expect(response.status).toBe(200);
    expect(response.body.data.title).toBe("Node.js");
    expect(response.body.data.description).toBe("Learn Node.js");
  });

  test("Get a course with id not found return 404", async () => {
    const response = await request(app).get(
      "/api/courses/67d331989d439a57e9c008e1"
    );

    expect(response.body).toEqual({
      type: "about:blank",
      title: "Course Not Found",
      status: 404,
      detail: "The course with ID 67d331989d439a57e9c008e1 was not found.",
      instance: "/courses/67d331989d439a57e9c008e1",
    });
  });

  test("Get a course with id invalid return 400", async () => {
    const response = await request(app).get("/api/courses/123");

    expect(response.body).toEqual({
      type: "about:blank",
      title: "Bad Request",
      status: 400,
      detail: "Invalid ID: 123",
      instance: "/courses",
    });
  });

  test("Delete a course", async () => {
    const courseCreated = await course.create({
      title: "Node.js",
      description: "Learn Node.js",
    });

    const response = await request(app).delete(
      `/api/courses/${courseCreated.id}`
    );

    expect(response.status).toBe(204);
  });

  test("Delete a course with id not found return 404", async () => {
    const response = await request(app).delete(
      "/api/courses/67d331989d439a57e9c008e1"
    );

    expect(response.body).toEqual({
      type: "about:blank",
      title: "Course Not Found",
      status: 404,
      detail: "The course with ID 67d331989d439a57e9c008e1 was not found.",
      instance: "/courses/67d331989d439a57e9c008e1",
    });
  });

  test("Delete a course with id invalid return 400", async () => {
    const response = await request(app).delete("/api/courses/123");

    expect(response.body).toEqual({
      type: "about:blank",
      title: "Bad Request",
      status: 400,
      detail: "Invalid ID: 123",
      instance: "/courses",
    });
  });
});
