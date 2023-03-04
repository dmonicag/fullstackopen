const loginRouter = require('express').Router()
const User = require('../models/user')
const webtoken = require('jsonwebtoken')
const bcrypt = require('bcrypt')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })

  const password_correct = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if(!(user && password_correct)){
    return response.status(401)
      .json({ error: 'invalid username or password' })
  }

  const user_token = {
    username: user.username,
    id: user._id
  }

  const token = webtoken.sign(user_token, process.env.SECRET)
  response.status(200)
    .send({ token, username: user.username, user: user })
})

module.exports = loginRouter