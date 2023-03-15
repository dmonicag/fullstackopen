const Blog = require('../models/bloglist')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const initialBlogList = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  }
]
//const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1vbmljYSIsImlkIjoiNjQwNTZlYzllYjIyNDljYjcwZDE3Yjc0IiwiaWF0IjoxNjc4MDgxODQ3fQ.VCPSj0ZQcHN49X00ezXsjFsjubAimid5k-EMuI7acrI'

const initial_user = async () => {
  const passwordHash = await bcrypt.hash('first', 10)
  const user = new User({ username: 'firstuser', passwordHash })
  await user.save()
}

const add_another_user = async () => {
  const passwordHash = await bcrypt.hash('Peace12', 10)
  const user = new User({ username: 'monica', passwordHash })
  await user.save()
}

const nonExistingID = async () => {
  const blog = new Blog({ url: 'dummy' })
  await blog.save()
  await blog.remove()
  return blog._id.toString()
}

const blogs_in_db = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const users_in_db = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const login_user = async (username, password) => {
  const user_login = {
    username: username,
    password: password
  }
  const response = await api.post('/api/login').send(user_login)
  const body = response.body
  return body.token
}

const add_blogs_forUser = async (username, password) => {
  const token = await login_user(username, password)
  initialBlogList.forEach(async blog => {
    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
  })
}
module.exports = { initialBlogList,
  nonExistingID,
  blogs_in_db,
  initial_user,
  add_another_user,
  users_in_db,
  login_user,
  add_blogs_forUser }