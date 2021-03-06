const router = require('express').Router()
const crypto = require('../utils/crypto')
const User = require('../models/user')
const { PasswordValidationError } = require('../utils/error')

router.post('/', async (req, res) => {
  const content = req.body
  if (!content.password)
    throw new PasswordValidationError("Password is required")
  
  if (content.password.length < 3)
    throw new PasswordValidationError("Password must be at least 3 characters long")
  
  content.passwordHash = await crypto.encrypt(content.password)
  delete content.password

  const user = new User(content)
  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

router.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1})
  res.json(users)
})

module.exports = router