const helper = require('./test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  await helper.initial_user()
})

describe('when user db has entries', () => {
  test('retrieving users from db successful', async () => {
    const users = await api.get('/api/users')
    const usernames = users.body.map(user => user.username)
    expect(usernames).toContain('firstuser')
  })

  test('creating new user successful', async () => {
    const initial_users_inDB = await helper.users_in_db()

    const new_user = {
      username: 'monica',
      user: 'Monica Gandhi',
      password: 'peace',
    }

    await api.post('/api/users')
      .send(new_user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const all_users = await helper.users_in_db()
    expect(all_users).toHaveLength(initial_users_inDB.length + 1)

    const usernames = all_users.map(u => u.username)
    expect(usernames).toContain(new_user.username)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})

