const request = require("supertest");
const mongoose = require("mongoose");
const { app } = require("../../main");
const course = require("../../models/courses");
const connectDB = require("../../config/DBConnected");
const { log } = require("winston");


describe("E2E Tests - course API", () => {
  let session; 

  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    
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
      .post("/courses")
      .send({ title: "Node.js", description: "Learn Node.js" });

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data.title).toBe("Node.js");
  });

  test("Create a course without title return 400", async () => {
    const response = await request(app)
      .post("/courses")
      .send({ description: "Learn Node.js" });

    expect(response.body).toEqual({
      type: "about:blank",
      title: "Bad Request",
      status: 400,
      detail: "Title and description are required",
      instance: "/courses",
    });
  });

  test("Creat a courses and Get all courses should return 200", async () => {
    await course.create({ title: "Node.js", description: "Learn Node.js" });
    await course.create({ title: "React", description: "Learn React" });
    
    const response = await request(app).get("/courses");
    
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "Node.js",
          description: "Learn Node.js"
        }),
        expect.objectContaining({
          title: "React",
          description: "Learn React"
        })
      ])
    );
  });


  test("Create and Get a course with id, return 200", async () => {
    const courseCreated = await course.create({
      title: "Node.js",
      description: "Learn Node.js",
    });

    const response = await request(app).get(`/courses/${courseCreated._id}`);

    expect(response.status).toBe(200);
    expect(response.body.data.title).toBe("Node.js");
    expect(response.body.data.description).toBe("Learn Node.js");
  });

  test("Get a course with id not found return 404", async () => {
    const response = await request(app).get(
      "/courses/c615664e-e562-4fc0-9e70-a57c13bb1bb7"
    );

    expect(response.body).toEqual({
      type: "about:blank",
      title: "Course Not Found",
      status: 404,
      detail: "The course with ID c615664e-e562-4fc0-9e70-a57c13bb1bb7 was not found.",
      instance: "/courses/c615664e-e562-4fc0-9e70-a57c13bb1bb7",
    });
  });

  test("Get a course with id invalid return 400", async () => {
    const response = await request(app).get("/courses/123");

    expect(response.body).toEqual({
      type: "about:blank",
      title: "Bad Request",
      status: 400,
      detail: "Invalid ID: 123",
      instance: "/courses",
    });
  });

  test("Create and Delete a course", async () => {
    const courseCreated = await course.create({
      title: "Node.js",
      description: "Learn Node.js",
    });

    const response = await request(app).delete(
      `/courses/${courseCreated._id}`
    );



    expect(response.status).toBe(204);
  });

  test("Delete a course with id not found return 400", async () => {
    const response = await request(app).delete(
      "/courses/c615664e-e562-4fc0-9e70-a57c13bb1bb7"
    );

    expect(response.body).toEqual({
      type: "about:blank",
      title: "Course Not Found",
      status: 404,
      detail: "The course with ID c615664e-e562-4fc0-9e70-a57c13bb1bb7 was not found.",
      instance: "/courses/c615664e-e562-4fc0-9e70-a57c13bb1bb7",
    });
  });

  test("Delete a course with id invalid return 400", async () => {
    const response = await request(app).delete("/courses/123");

    expect(response.body).toEqual({
      type: "about:blank",
      title: "Bad Request",
      status: 400,
      detail: "Invalid ID: 123",
      instance: "/courses",
    });
  });
});
