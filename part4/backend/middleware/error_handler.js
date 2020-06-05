module.exports = (err, req, res, next) => {
  console.log(err.name, err.message)
  if (err.name === 'ValidationError'
      || err.name === 'CastError'
      || err.name === 'PasswordValidationError')
    res.status(400).json({
      error: err.message
    })
  next(err)
}