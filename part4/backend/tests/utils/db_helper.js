const mongoose = require('mongoose')
const crypto = require('../../utils/crypto')
const Blog = require('../../models/blog')
const User = require('../../models/user')
const initialBlogs = require('./initial_blogs.json')
const MongoDBMemoryServer = require('mongodb-memory-server')
let mongoServer;

const setupTestDB = async () => {
  mongoServer = new MongoDBMemoryServer.MongoMemoryServer();
  const uri = await mongoServer.getUri()
  await mongoose.connect(uri, { 
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
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

const getExistingId = async () => {
  const entries = await Blog.find({})
  if (entries.length > 0)
    return entries[0].id
  else
    return undefined
}

const getNonExistentId = async () => {
  const entry = new Blog({title: 'does', author: 'not', url: 'matter', likes: 0})
  const saved = await entry.save()
  await Blog.findByIdAndRemove(saved.id)
  return saved.id
}

const resetUsers = async () => {
  await User.deleteMany({})
  const user = new User({
    name: 'Luke',
    username: 'admin',
    passwordHash: await crypto.encrypt('shhh')
  })
  await user.save()
}

module.exports = {
  setupTestDB,
  teardownTestDB,
  resetBlogs,
  getExistingId,
  getNonExistentId,
  resetUsers
}