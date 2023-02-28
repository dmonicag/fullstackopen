const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
require('express-async-errors')

const app = express()

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGO_URI)

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app