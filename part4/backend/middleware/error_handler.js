module.exports = (err, req, res, next) => {
  if (err.name === 'ValidationError')
    res.status(400).json({
      error: err.message
    })
  else if (err.name === 'CastError')
    res.status(400).json({
      error: 'invalid id'
    })
  next(err)
}