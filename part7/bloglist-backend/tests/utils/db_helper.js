const mongoose = require('mongoose')
const crypto = require('../../utils/crypto')
const Blog = require('../../models/blog')
const User = require('../../models/user')
const initialBlogs = require('./initial_blogs.json')
const config = require('../../utils/config')
const MongoDBMemoryServer = require('mongodb-memory-server')
let mongoServer;

const setupTestDB = async () => {
  mongoServer = new MongoDBMemoryServer.MongoMemoryServer();
  const uri = await mongoServer.getUri()
  await mongoose.connect(uri, config.mongooseOptions)
}

const teardownTestDB = async () => {
  if (mongoServer) {
    await mongoose.disconnect()
    await mongoServer.stop()
  }
}

const resetDB = async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  let user = new User({
    name: 'test',
    username: 'user',
    passwordHash: await crypto.encrypt('shhh')
  })
  user = await user.save()

  // save user id with blogs and blog ids to user
  const blogsToSave = initialBlogs.map(b => (new Blog({...b, user})).save())
  const blogs = await Promise.all(blogsToSave)
  const blogIds = blogs.map(b => b._id)
  user.blogs = blogIds
  await user.save()
}

const getExistingId = async () => {
  const entry = await Blog.findOne({})
  if (entry)
    return entry._id.toString()
  else
    return undefined
}

const getNonExistentId = async () => {
  const entry = new Blog({title: 'does', author: 'not', url: 'matter', likes: 0})
  const saved = await entry.save()
  await Blog.findByIdAndRemove(saved._id)
  return saved._id.toString()
}

const resetUsers = async () => {
  const user = new User({
    name: 'test',
    username: 'user',
    passwordHash: await crypto.encrypt('shhh')
  })
  await user.save()
}

module.exports = {
  setupTestDB,
  teardownTestDB,
  resetDB,
  getExistingId,
  getNonExistentId
}