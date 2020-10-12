const http = require('http')
const app = require('./app')
const config = require('./utils/config')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI, config.mongooseOptions)

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
