class NotAuthenticatedError extends Error {}
class NotAuthorizedError extends Error {}
class PasswordValidationError extends Error {}

module.exports = {
  NotAuthenticatedError,
  NotAuthorizedError,
  PasswordValidationError
}