require('dotenv').config()
const jwt = require('jsonwebtoken')

const getAuthToken = (user) => {
  const credentials = { 
    username: user.username,
    id: user._id.toString()
  }
  return jwt.sign(credentials, process.env.SECRET)
}

module.exports = {
  getAuthToken
}