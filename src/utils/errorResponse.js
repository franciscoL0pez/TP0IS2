const createErrorResponse = (status, title, detail, instance = "/courses") => ({
    type: 'String',
    title,
    status,
    detail,
    instance
  });
  
  module.exports = createErrorResponse;
  