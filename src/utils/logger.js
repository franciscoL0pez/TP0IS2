const winston = require("winston");

/**
 * Configures the Winston logger for the application.
 *
 * @module logger
 * @description Creates and configures a Winston logger to log messages with a timestamp and a custom format.
 * The logs are written to a file located at `src/logs/file.log`.
 *
 * @returns {Object} The configured Winston logger instance.
 */

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [new winston.transports.File({ filename: "src/logs/file.log" })],
});

module.exports = logger;
