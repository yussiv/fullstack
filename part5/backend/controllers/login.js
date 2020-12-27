const jwt = require('jsonwebtoken')
const crypto = require('../utils/crypto')
const router = require('express').Router()
const User = require('../models/user')

router.post('/', async (req, res) => {
  const {username, password} = req.body

  const user = await User.findOne({ username })
  
  const passwordValid = user === null ? false
    : await crypto.checkPassword(password, user.passwordHash)

  if (!(user && passwordValid)) {
    return res.status(401).json({
      error: 'Invalid username or password'
    })
  }

  const userForToken = {
    username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  res.status(200).send({token, username, name: user.name, id: user._id.toString() })
})

module.exports = router