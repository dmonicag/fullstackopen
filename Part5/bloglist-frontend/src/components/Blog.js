import {  useState } from "react"
import blogService from '../services/blogs'

const Blog = ({blog, addLike, handleDelete, user}) => {
  const [blogsview, setblogView] = useState(false)
  const hideWhenVisible = { display: blogsview ? 'none' : '' }
  const showWhenVisible = { display: blogsview ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLike = async () => {
    const blogs = await blogService.getAll()
    const blogToUpdate = blogs.find(b => b.id === blog.id)
    const likeObject = {...blogToUpdate, likes: blogToUpdate.likes+1}
    addLike(likeObject, blogToUpdate.id)
  }

  const userAddedBlog = blog.user.map(b => b.id)

  return(
  <div style={blogStyle}>
    {blog.title}
      &ensp;
      <button onClick={() => setblogView(true)} style={hideWhenVisible}>View</button>
      <button onClick={() => setblogView(false)} style={showWhenVisible}>Hide</button>
      <div style={showWhenVisible}>              
        <span>
          <b>Author: </b> {blog.author}
        </span>
        <span>
          <b>Url: </b>{blog.url}
        </span>
        <span>
          <b>Likes: </b>{blog.likes}&nbsp;
          <button className="likebtn" onClick={handleLike}>like</button>
        </span>
        <span>
          <b>Added by: </b> 
          {blog.user.map(b => b.user)}
          &ensp;                  
          {(user.user.id === userAddedBlog.toString()) ?
            <button className="deletebtn" onClick={handleDelete} style={showWhenVisible}>Remove</button>
            :
            null
          }
        </span>        
      </div>
  </div>    
)}
export default Blog