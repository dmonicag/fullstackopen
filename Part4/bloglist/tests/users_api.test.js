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

  test('creating new user successful with valid data', async () => {
    const initial_users_inDB = await helper.users_in_db()

    const new_user = {
      username: 'monica',
      user: 'Monica Gandhi',
      password: 'Peace12',
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

describe('adding new users to database', () => {
  test('returns 400 Bad request with invalid username', async () => {
    const new_user = {
      username: 'Ka',
      user: 'Kavita kannan',
      password: 'Pink123'
    }
    const test = await api.post('/api/users')
      .send(new_user)
      .expect(400)
    expect(test.body.error)
      .toContain('`username` (`Ka`) is shorter than the minimum allowed length (3).')
  })

  test('returns 400 Bad request with invalid password', async () => {
    const new_user = {
      username: 'Kavita',
      user: 'Kavita kannan',
      password: 'hello'
    }
    const test = await api.post('/api/users')
      .send(new_user)
      .expect(400)
    expect(test.body.error)
      .toContain('password must be atleast 5 characters long')
  })

  test('returns 400 Bad request with missing username', async () => {
    const new_user = {
      user: 'Kavita kannan',
      password: 'Hello89'
    }
    const test = await api.post('/api/users')
      .send(new_user)
      .expect(400)
    expect(test.body.error)
      .toContain('Path `username` is required.')
  })

  test('returns 400 Bad request with existing username', async () => {
    const new_user = {
      username: 'firstuser',
      user: 'Kavita',
      password: 'Hello89'
    }
    const test = await api.post('/api/users')
      .send(new_user)
      .expect(400)
    expect(test.body.error)
      .toContain('expected `username` to be unique.')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})

