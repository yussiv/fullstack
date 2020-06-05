const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  }
})

userSchema.set('toJSON', { transform: (_, user) => {
  user.id = user._id.toString()
  delete user._id
  delete user.__v
  delete user.passwordHash
} });

module.exports = mongoose.model('User', userSchema)