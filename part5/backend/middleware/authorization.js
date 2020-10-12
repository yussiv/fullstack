require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (req, res, next) => {
  const authHeader = req.get('authorization')
  if (authHeader) {
    if (authHeader.toLowerCase().startsWith('bearer'))
      req.token = authHeader.substr(7)
    else
      req.token = authHeader
  }
  next()
}

const userResolver = async (req, res, next) => {
  try {
    const token = jwt.verify(req.token, process.env.SECRET)
    const user = await User.findById(token.id)
    if (user) {
      req.authenticated = true
      req.user = user
    }
  } catch {
    // shh
  }
  next()
}

module.exports = {
  tokenExtractor, userResolver
}