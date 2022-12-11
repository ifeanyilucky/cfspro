const CustomApiError = require('./customError');

class UnAuthenticationError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnAuthenticationError;
