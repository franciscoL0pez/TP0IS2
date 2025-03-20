/**
 * Creates an error response object to be returned in API responses.
 *
 * @function createErrorResponse
 * @param {number} status - The HTTP status code.
 * @param {string} title - The title of the error.
 * @param {string} detail - Detailed description of the error.
 * @param {string} instance - A unique identifier for the error instance (e.g., URL or request ID).
 * @returns {Object} The error response object.
 */

const createErrorResponse = (status, title, detail, instance) => ({
  type: "about:blank",
  title,
  status,
  detail,
  instance,
});

module.exports = createErrorResponse;
