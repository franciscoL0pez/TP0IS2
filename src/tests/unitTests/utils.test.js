const errorResponse = require("../../utils/errorResponse");
const logger = require("../../utils/logger");

// winston mock to no write to files
jest.mock("winston", () => {
  const originalModule = jest.requireActual("winston");

  return {
    ...originalModule,
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      error: jest.fn(),
    }),
  };
});

describe("logger tests", () => {
  let logInfoSpy, logErrorSpy;

  beforeEach(() => {
    logInfoSpy = jest.spyOn(logger, "info");
    logErrorSpy = jest.spyOn(logger, "error");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("logger show info message", () => {
    logger.info("info log");
    expect(logInfoSpy).toHaveBeenCalledWith("info log");
  });

  test("logger show error message", () => {
    logger.error("error log");
    expect(logErrorSpy).toHaveBeenCalledWith("error log");
  });
});

describe("errorResponse tests", () => {
  test("errorResponse returns error object", () => {
    const error = errorResponse(404, "Not found", "detail", "instance");
    expect(error).toEqual({
      type: "about:blank",
      title: "Not found",
      status: 404,
      detail: "detail",
      instance: "instance",
    });
  });
});
