export default {
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
  INTERNAL_ERROR: {
    statusCode: 400,
    error: 'Internal Server Error',
  },
  INVALID_CAST_ID: {
    statusCode: 400,
    error: 'cast_id url parameter is invalid.',
  },
  INVALID_RESOURCE_ID: {
    statusCode: 400,
    error: 'resource_id url parameter is invalid.',
  },
  INVALID_MOVIE_ID: {
    statusCode: 400,
    error: 'movie_id url parameter is invalid.',
  },
  INVALID_ID: {
    statusCode: 400,
    error: 'id url parameter is invalid.',
  },
};