const mongoose = require('mongoose')
const Blog = require('../../models/blog')
const initialBlogs = require('./initial_blogs.json')
const MongoDBMemoryServer = require('mongodb-memory-server')
let mongoServer;

const setupTestDB = async () => {
  mongoServer = new MongoDBMemoryServer.MongoMemoryServer();
  const uri = await mongoServer.getUri()
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
}

const teardownTestDB = async () => {
  if (mongoServer) {
    await mongoose.disconnect()
    await mongoServer.stop()
  }
}

const resetBlogs = async () => {
  await Blog.deleteMany({})
  const blogsToSave = initialBlogs.map(b => (new Blog(b)).save())
  await Promise.all(blogsToSave)
}

module.exports = {
  setupTestDB,
  teardownTestDB,
  resetBlogs
}