const { PasswordValidationError,
        NotAuthorizedError,
        NotAuthenticatedError} = require('../utils/error')

module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test')
    console.log(err.name, err.message)
  
  if (err.name === 'ValidationError'
      || err.name === 'CastError'
      || err instanceof PasswordValidationError)
    return res.status(400).json({
      error: err.message
    })
  
  if (err instanceof NotAuthorizedError)
    return res.status(401).json({
      error: 'Not authorized'
    })
  
  if (err instanceof NotAuthenticatedError)
    return res.status(401).json({
      error: 'Authentication is required'
    })
  
  next(err)
}