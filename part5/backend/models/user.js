const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  passwordHash: {
    type: String,
    required: true
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', { transform: (_, user) => {
  user.id = user._id.toString()
  delete user._id
  delete user.__v
  delete user.passwordHash
} });

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)