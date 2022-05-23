class BadRquestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.errorName = 'BadRquestError';
    this.errorMessage = message;
  }
}

module.exports = BadRquestError;
