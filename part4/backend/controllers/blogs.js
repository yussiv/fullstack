const router = require('express').Router()
const Blog = require('../models/blog')


router.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})


router.post('/', async (request, response) => {
  const {title, author, likes} = request.body
  const blog = new Blog({title, author, likes})

  const newBlog = await blog.save()
  response.status(201).json(newBlog)
})


module.exports = router