const CustomApiError = require('./customError');

class UnAuthError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnAuthError;
