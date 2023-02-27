const Blog = require('../models/bloglist')

const blogsRouter = require('express').Router()

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({})   
  response.json(blogs)

})
  
blogsRouter.post('/', async (request, response) => {
    const new_blog = new Blog(request.body)
    const saved_blog = await new_blog.save()
    response.status(201).json(saved_blog)
})

module.exports = blogsRouter