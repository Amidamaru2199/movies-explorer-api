class DublicateError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.errorName = 'DublicateError';
    this.errorMessage = message;
  }
}

module.exports = DublicateError;
