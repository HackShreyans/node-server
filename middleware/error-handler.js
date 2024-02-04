class CustomError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.name = this.constructor.name;
      this.statusCode = statusCode;
    }
  }
  
  class ValidationError extends CustomError {
    constructor(message = 'Validation Error') {
      super(message, 400);
    }
  }
  
  class NotFoundError extends CustomError {
    constructor(message = 'Not Found') {
      super(message, 404);
    }
  }
  
  module.exports = { CustomError, ValidationError, NotFoundError };
  