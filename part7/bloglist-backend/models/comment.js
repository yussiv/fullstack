const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }
})

commentSchema.set('toJSON', { transform: (_, comment) => {
  comment.id = comment._id.toString()
  delete comment._id
  delete comment.__v
} });

module.exports = mongoose.model('Comment', commentSchema)