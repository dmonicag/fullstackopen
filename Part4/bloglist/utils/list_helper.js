const _ = require('lodash')

const dummy = (blogs) => {
  if(Array.isArray(blogs))
  return 1
}

const totalLikes = (blogs) => {
  const listofLikes = blogs.map(blog => blog.likes)
  let sum = 0;
  for (let i = 0; i < listofLikes.length; i++) 
    {
      sum += listofLikes[i];
    }
  return sum
}

const favouriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map(m => m.likes))
  const fav = blogs.find(b => b.likes === maxLikes)
  return fav
}

const mostBlogs = (blogs) => {
  var authorArray =  _.map(blogs, 'author')
  var mostBlogs_author = _.head(_(authorArray).countBy().entries().maxBy(_.last))
  const a = blogs.filter(b => b.author === mostBlogs_author)
  var author_blogs = { "author": mostBlogs_author, "blogs": a.length}

  return author_blogs
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}