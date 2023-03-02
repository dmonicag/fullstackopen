const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/bloglist')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogList)
})

describe('when database has blog entires', () => {
  test('all blogs returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogList.length)
  })

  test('a specific blog title is within the returned blog list', async () => {
    const response = await api.get('/api/blogs')
    const title = response.body.map(t => t.title)
    expect(title).toContain('Canonical string reduction')
  })

  test('properties id and url are present', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).not.toBeDefined()
    expect(response.body[0].url).toBeDefined()
  })
})

describe('viewing a specific blog entry', () => {
  test('with a valid id is succesful', async () => {
    const initial_blogs = await helper.blogs_in_db()
    const requested_blog = await api.get(`/api/blogs/${initial_blogs[0].id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(requested_blog.body).toEqual(initial_blogs[0])
  })

  test('returns 404 Not found for non existing blog id', async () => {
    const non_existing_id = await helper.nonExistingID()
    await api.get(`/api/blogs/${non_existing_id}`)
      .expect(404)
  })

  test('returns 400 Bad request for invalid id', async () => {
    const invalid_id = '1234'
    await api.get(`/api/blogs/${invalid_id}`)
      .expect(400)
  })
})

describe('adding new blog data to the list', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    }
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const totalBlogPosts = await helper.blogs_in_db()
    expect(totalBlogPosts).toHaveLength(helper.initialBlogList.length+1)

    const blog_content = totalBlogPosts.map(b => b.title)
    expect(blog_content).toContain('Go To Statement Considered Harmful')
  })

  test('returns 400 Bad request if title and author are missing', async () => {
    const new_blog = {
      url:'https://www.bacancytechnology.com/blog/whats-new-in-node-js-18',
      likes: 12
    }
    await api.post('/api/blogs')
      .send(new_blog)
      .expect(400)
    const totalBlogPosts = await helper.blogs_in_db()
    expect(totalBlogPosts).toHaveLength(helper.initialBlogList.length)
  })

  test('returns 400 Bad request if "url" property is missing', async () => {
    const new_blog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      likes: 10,
    }
    await api.post('/api/blogs')
      .send(new_blog)
      .expect(400)
  })

  test('assigns default value 0 to "likes" when it is not included in request', async () => {
    const new_blog = {
      title: 'What’s New In Node Js 18?',
      author: 'Mrinal Saraswat',
      url: 'https://www.bacancytechnology.com/blog/whats-new-in-node-js-18'
    }
    await api.post('/api/blogs')
      .send(new_blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogs = await helper.blogs_in_db()
    expect(blogs[blogs.length-1].likes).toBe(0)
  })
})

describe('deletion of blog entry', () => {
  test('succeeds with valid id', async () => {
    const initial_blogs = await helper.blogs_in_db()
    const delete_blog = initial_blogs[1]

    await api.delete(`/api/blogs/${delete_blog.id}`)
      .expect(204)

    const remaining_blogs = await helper.blogs_in_db()
    expect(remaining_blogs).toHaveLength(helper.initialBlogList.length - 1)

    const blog_titles = remaining_blogs.map(d => d.title)
    expect (blog_titles).not.toContain(delete_blog.title)
  })

  test('returns 400 Bad request for invalid id', async () => {
    const invalid_id = '1234'
    await api.delete(`/api/blogs/${invalid_id}`)
      .expect(400)
  })
})

describe('updating blog data', () => {
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