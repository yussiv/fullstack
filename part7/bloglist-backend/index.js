const http = require('http')
const app = require('./app')
const config = require('./utils/config')
const mongoose = require('mongoose')

if (process.env.NODE_ENV === 'test') {
  console.log('Test mode: starting in-memory MongoDB.')

  const MongoDBMemoryServer = require('mongodb-memory-server')
  const setupTestDB = async () => {
    const mongoServer = new MongoDBMemoryServer.MongoMemoryServer();
    const uri = await mongoServer.getUri()
    await mongoose.connect(uri, config.mongooseOptions)
  }
  setupTestDB();
} else {
  mongoose.connect(config.MONGODB_URI, config.mongooseOptions)
}

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
