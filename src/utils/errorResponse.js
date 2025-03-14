const createErrorResponse = (status, title, detail, instance ) => ({
    type: 'about:blank',
    title,
    status,
    detail,
    instance
  });
  
  module.exports = createErrorResponse;
  