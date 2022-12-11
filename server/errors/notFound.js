const CustomApiError = require('./customError');

class NotFoundError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
