const CustomApiError = require('./customError');

class badRequest extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = badRequest;
