const Blog = require('../models/bloglist')
const User = require('../models/user')
const bcrypt = require('bcrypt')

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

const initial_user = async () => {
  const passwordHash = await bcrypt.hash('first', 10)
  const user = new User({ username: 'firstuser', passwordHash })

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

module.exports = { initialBlogList, nonExistingID, blogs_in_db, initial_user, users_in_db }