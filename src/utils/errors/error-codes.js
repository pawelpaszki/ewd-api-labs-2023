module.exports = {
  UNAUTHORIZED: {
    statusCode: 401,
    error: 'Unauthorised',
  },
  ACCOUNT_NOT_FOUND: {
    statusCode: 404,
    error: 'Account not found',
  },
  RESOURCE_NOT_FOUND: {
    statusCode: 404,
    error: 'Resource not found',
  },
  BAD_TOKEN: {
    statusCode: 401,
    error: 'Invalid token',
  },
  INTERNAL_ERROR: {
    statusCode: 500,
    error: 'Internal Server Error',
  },
};