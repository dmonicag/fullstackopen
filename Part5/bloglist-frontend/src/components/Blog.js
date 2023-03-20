import {  useState } from "react"

const Blog = ({blogs, handleLike}) => {
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
    {blogs.title}
      &ensp;
      <button onClick={() => setblogView(true)} style={hideWhenVisible}>View</button>
      <button onClick={() => setblogView(false)} style={showWhenVisible}>Hide</button>
      <div style={showWhenVisible}>              
        <span>
          <b>Author: </b> {blogs.author}
        </span>
        <span>
          <b>Url: </b>{blogs.url}
        </span>
        <span>
          <b>Likes: </b>{blogs.likes}&nbsp;
          <button onClick={handleLike}>like</button>
        </span>
        <span>
          <b>Added by: </b>
          {blogs.user.map(b => b.user)}
        </span>
      </div>
  </div>    
)}
export default Blog