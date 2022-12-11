const CustomAPIError = require('./customError');
const BadRequestError = require('./badRequest');
const NotFoundError = require('./notFound');
const UnAuthenticationError = require('./unAuth');

module.exports = {
  CustomAPIError,
  BadRequestError,
  NotFoundError,
  UnAuthenticationError
};
