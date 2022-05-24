class DeletionError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.errorName = 'DeletionError';
    this.errorMessage = message;
  }
}

module.exports = DeletionError;
