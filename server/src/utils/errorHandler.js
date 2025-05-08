export const handleError = (c, error, operation) => {
  // Log the error for debugging
  console.error(`Error during ${operation}:`, error);

  // Default response
  let statusCode = 500;
  let message = 'An unexpected error occurred';

  // Handle common error types
  if (error.message.includes('not found')) {
    statusCode = 404;
    message = error.message;
  } else if (error.message.includes('required') || error.message.includes('invalid')) {
    statusCode = 400;
    message = error.message;
  } else if (error.message.includes('unauthorized') || error.message.includes('permission')) {
    statusCode = 401;
    message = 'Not authorized to perform this action';
  }

  // Return the error response
  return c.json({
    success: false,
    error: message
  }, statusCode);
};
