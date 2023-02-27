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

test('two blogs returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogList.length)
})

test('unique identifier is called id', async () =>{
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('add a new blog to the database', async () => {
    const newBlog = {
       title: "Go To Statement Considered Harmful",
       author: "Edsger W. Dijkstra",
       url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
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

test('property "likes" missing defaults to 0', async () => {
    const new_blog = {
        "title": "What’s New In Node Js 18?",
        "author": "Mrinal Saraswat",
        "url": "https://www.bacancytechnology.com/blog/whats-new-in-node-js-18"
    }

    await api.post('/api/blogs')
            .send(new_blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)        

    const blogs = await helper.blogs_in_db()
    expect(blogs[blogs.length-1].likes).toBe(0)
})

afterAll(async () => {
    await mongoose.connection.close()
})