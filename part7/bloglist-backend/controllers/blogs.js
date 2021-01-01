const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const { NotAuthorizedError, NotAuthenticatedError} = require('../utils/error')

router.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    .populate('user', {name: 1, username: 1})
    .populate('comments', {content: 1})
  res.json(blogs)
})

router.post('/', async (req, res) => {
  if (!req.authenticated)
    throw new NotAuthenticatedError()

  const user = req.user
  
  const blog = new Blog({
    ...req.body,

    user: user._id
  })
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  if(!req.authenticated)
    throw new NotAuthenticatedError()
  
  const blog = await Blog.findByIdAndRemove(id)
  if (blog) {
    const ownerId = blog.user.toString()
    const userId = req.user.id.toString()
    if(ownerId !== userId)
      throw new NotAuthorizedError()

    await removeBlogFromUser(id, blog.user)
  }
  res.status(204).end()
})

router.put('/:id', async (req, res) => {
  if (!req.authenticated)
    throw new NotAuthenticatedError()
  
  let updatedBlog = req.body
  const id = req.params.id
  const blog = await Blog.findById(id)
  if (blog) {
    const ownerId = blog.user.toString()
    const userId = req.user._id.toString()
    if(ownerId !== userId) {
      // allow incrementing likes by other users
      if (updatedBlog.likes === blog.likes + 1)
        updatedBlog = { ...blog.toObject(), likes: updatedBlog.likes }
      else
        throw new NotAuthorizedError()
    }
  }
  const result = await Blog
    .findByIdAndUpdate(id, updatedBlog, { new: true })
    .populate('user', {name: 1, username: 1})
  res.json(result)
})

const removeBlogFromUser = async (blogId, userId) => {
  const user = await User.findById(userId)
  if (user) {
    user.blogs = user.blogs.filter(b => b !== blogId)
    await user.save()
  }
}

router.post('/:id/comments', async (req, res) => {
  // if (!req.authenticated)
  //   throw new NotAuthenticatedError()

  const id = req.params.id
  const blog = await Blog.findById(id)

  const comment = new Comment({
    ...req.body,

    blog: blog._id
  })
  const savedComment = await comment.save()

  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()

  res.status(201).json(savedComment)
})

module.exports = router