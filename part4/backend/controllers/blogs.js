const router = require('express').Router()
const Blog = require('../models/blog')


router.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})


router.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const newBlog = await blog.save()
  response.status(201).json(newBlog)
})

router.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndRemove(id)
  response.status(204).end()
})

router.put('/:id', async (request, response) => {
  const id = request.params.id
  const result = await Blog.findByIdAndUpdate(id, request.body, { new: true })
  response.json(result)
})

module.exports = router