const router = require('express').Router()
const crypto = require('../utils/crypto')
const User = require('../models/user')

router.post('/', async (req, res) => {
  const content = req.body
  content.passwordHash = await crypto.encrypt(content.password)
  delete content.password
  
  const user = new User(content)
  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

router.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

module.exports = router