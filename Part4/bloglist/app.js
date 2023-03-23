const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
require('express-async-errors')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGO_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)

if(process.env.NODE_ENV === 'test'){
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app