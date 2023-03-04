const Blog = require('../models/bloglist')
require('express-async-errors')
const User = require('../models/user')
const blogsRouter = require('express').Router()
const webtoken = require('jsonwebtoken')

const get_token = (request) => {
  const authorization = request.get('Authorization')

  if(authorization && authorization.startsWith('Bearer ')){
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, user: 1 })
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
  const body = request.body

  const token = webtoken.verify(get_token(request), process.env.SECRET)
  if(!token.id){
    return response.status(401).json({ error: 'token invaid' })
  }

  const user = await User.findById(token.id)

  const new_blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })
  if(!new_blog.title || !new_blog.url){
    return response.status(400)
      .json({
        error: 'title or blog url missing'
      })
  }

  const saved_blog = await new_blog.save()
  user.blogs = user.blogs.concat(saved_blog._id)
  await user.save()
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