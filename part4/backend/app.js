const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const {tokenExtractor, userResolver} = require('./middleware/authorization')
const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const errorHandler = require('./middleware/error_handler')


app.use(cors())
app.use(tokenExtractor)
app.use(userResolver)
app.use(express.json())
app.use('/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use(errorHandler)

module.exports = app