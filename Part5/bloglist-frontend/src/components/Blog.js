import { useState } from "react"

const Blog = ({blog}) => {
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
          <button>like</button>
        </span>
      </div>
  </div>    
)}
export default Blog