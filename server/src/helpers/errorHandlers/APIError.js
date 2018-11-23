const httpStatus = require('http-status');
const BaseError = require('./BaseError');

/**
 * Class representing an API error.
 * @extends BaseError
 */
class APIError extends BaseError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR, isPublic = false) {
    super(message, status, isPublic);
  }
}

module.exports = APIError;
