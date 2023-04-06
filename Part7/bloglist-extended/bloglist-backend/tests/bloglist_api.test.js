const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/bloglist')
const User = require('../models/user')
const api = supertest(app)

describe('when database has blog entires', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogList)
  })
  test('all blogs returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogList.length)
  })

  test('properties id and url are present', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).not.toBeDefined()
    expect(response.body[0].url).toBeDefined()
  })

  test('getting single blog with a valid id is succesful', async () => {
    const initial_blogs = await helper.blogs_in_db()
    const requested_blog = await api.get(`/api/blogs/${initial_blogs[0].id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(requested_blog.body).toEqual(initial_blogs[0])
  })

  test('getting single blog with non existing blog id returns 404 Not found', async () => {
    const non_existing_id = await helper.nonExistingID()
    await api.get(`/api/blogs/${non_existing_id}`)
      .expect(404)
  })

  test('getting single blog with invalid id returns 400 Bad request', async () => {
    const invalid_id = '1234'
    await api.get(`/api/blogs/${invalid_id}`)
      .expect(400)
  })
})

describe('adding new blog to the db with authorized token', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
  })

  test('returns 401 Unauthorized without token', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    }
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })

  test('succeeds with valid data', async () => {
    const token = await helper.login_user('firstuser', 'first')
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    }
    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const totalBlogPosts = await helper.blogs_in_db()
    expect(totalBlogPosts).toHaveLength(1)

    const blog_content = totalBlogPosts.map(b => b.title)
    expect(blog_content).toContain('Go To Statement Considered Harmful')
  })

  test('returns 400 Bad request if title and author are missing', async () => {
    const token = await helper.login_user('firstuser', 'first')
    const new_blog = {
      url:'https://www.bacancytechnology.com/blog/whats-new-in-node-js-18',
      likes: 12
    }
    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(new_blog)
      .expect(400)
    const totalBlogPosts = await helper.blogs_in_db()
    expect(totalBlogPosts).toHaveLength(0)
  })

  test('returns 400 Bad request if "url" property is missing', async () => {
    const token = await helper.login_user('firstuser', 'first')
    const new_blog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      likes: 10,
    }
    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(new_blog)
      .expect(400)
  })

  test('assigns default value 0 to "likes" when it is not included in request', async () => {
    const token = await helper.login_user('firstuser', 'first')
    const new_blog = {
      title: 'What’s New In Node Js 18?',
      author: 'Mrinal Saraswat',
      url: 'https://www.bacancytechnology.com/blog/whats-new-in-node-js-18'
    }
    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(new_blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogs = await helper.blogs_in_db()
    expect(blogs[blogs.length-1].likes).toBe(0)
  })
})

describe('deletion of blog entry', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await helper.initial_user()
    await helper.add_another_user()
  })

  test('succeeds with valid id and authorized token', async () => {
    await helper.add_blogs_forUser('firstuser', 'first')
    const token = await helper.login_user('firstuser', 'first')
    const blogs = await helper.blogs_in_db()

    await api.delete(`/api/blogs/${blogs[1].id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
  })

  test('returns 400 Bad request for invalid id and authorized token', async () => {
    const invalid_id = '1234'
    const token = await helper.login_user('firstuser', 'first')
    await api.delete(`/api/blogs/${invalid_id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
  })

  test('return code 401 Unauthorized for unauthorized token', async () => {
    const blogs = await helper.blogs_in_db()
    const login_token = await helper.login_user('monica', 'Peace12')
    await api.delete(`/api/blogs/${blogs[0].id}`)
      .set('Authorization', `Bearer ${login_token}`)
      .expect(401)
  })
})

describe('updating blog data', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogList)
  })

  test('successful when updating likes', async () => {
    const initial_blogs = await helper.blogs_in_db()
    const update_likes = {
      likes: `${initial_blogs[0].likes + 1}`
    }

    await api.put(`/api/blogs/${initial_blogs[0].id}`)
      .send(update_likes)
      .expect(200)

    const final_blogs = await helper.blogs_in_db()
    expect(final_blogs[0].likes).toBe(initial_blogs[0].likes + 1)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})