const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/bloglist')
const { forEach } = require('lodash')
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

afterAll(async () => {
    await mongoose.connection.close()
})