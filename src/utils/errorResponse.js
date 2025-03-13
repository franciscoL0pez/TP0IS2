const createErrorResponse = (status, title, detail, instance = "/courses") => ({
    type: `https://httpstatuses.com/${status}`,
    title,
    status,
    detail,
    instance
  });
  
  module.exports = createErrorResponse;
  