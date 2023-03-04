const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { author: 1, title: 1, url: 1, likes: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if(body.password === undefined)
  {
    return response.status(400)
      .json({
        error: 'password required'
      })
  }
  else if (body.password.length < 5 || (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(body.password)))
  {
    return response.status(400)
      .json({
        error: 'password must be atleast 5 characters long,\
        including atleast one capital letter, one small letter and a number'
      })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const new_user = new User({
    username: body.username,
    user: body.user,
    passwordHash: passwordHash
  })

  const saved_user = await new_user.save()
  response.status(201).json(saved_user)
})

module.exports = usersRouter

