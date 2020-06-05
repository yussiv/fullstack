const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {name: 1, username: 1})
  response.json(blogs)
})

router.post('/', async (request, response) => {
  const user = await User.findOne({})
  
  const blog = new Blog({
    ...request.body,

    user: user._id
  })
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

router.delete('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findByIdAndRemove(id)
  if (blog)
    await removeBlogFromUser(id, blog.user)

  response.status(204).end()
})

router.put('/:id', async (request, response) => {
  const id = request.params.id
  const result = await Blog.findByIdAndUpdate(id, request.body, { new: true })
  response.json(result)
})

const removeBlogFromUser = async (blogId, userId) => {
  const user = await User.findById(userId)
  if (user) {
    user.blogs = user.blogs.filter(b => b !== blogId)
    await user.save()
  }
} 

module.exports = router