const Blog = require('../models/bloglist')
require('express-async-errors')

const blogsRouter = require('express').Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(blog){
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const new_blog = new Blog(request.body)
  if(!new_blog.title || !new_blog.url){
    return response.status(400)
      .json({
        error: 'title or blog url missing'
      })
  }
  const saved_blog = await new_blog.save()
  response.status(201).json(saved_blog)
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const updated_blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  await Blog.findByIdAndUpdate(request.params.id,
    updated_blog ,
    { new: true })
  response.status(200).json({ info: 'update successful' })
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter