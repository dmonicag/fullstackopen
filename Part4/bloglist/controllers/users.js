const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, user, password } = request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const new_user = new User({
    username,
    user,
    passwordHash
  })

  const saved_user = await new_user.save()
  response.status(201).json(saved_user)
})

module.exports = usersRouter

