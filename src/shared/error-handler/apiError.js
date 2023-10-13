const statusCode = require('http-status');

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isApiError = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
class Api404Error extends ApiError {
  constructor(message = 'data not found.') {
    super(statusCode.NOT_FOUND, message);
  }
}
class Api401Error extends ApiError {
  constructor(message = 'Unauthorized request.') {
    super(statusCode.UNAUTHORIZED, message);
  }
}

class Api400Error extends ApiError {
  constructor(message = 'BAD_REQUEST') {
    super(statusCode.BAD_REQUEST, message);
  }
}

module.exports = {
  ApiError,
  Api404Error,
  Api401Error,
  Api400Error
};
