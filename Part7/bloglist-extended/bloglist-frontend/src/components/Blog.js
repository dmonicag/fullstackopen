import {  useState } from 'react'
import PropTypes from 'prop-types'
import { add_Like, delete_Blog } from '../reducers/BlogReducer'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/NotificationReducer'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
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
  const addLike = async (id) => {
    const likeObject = { ...blog, likes: blog.likes + 1 }
    dispatch(add_Like(likeObject,id))
    dispatch(notify(` You voted for '${blog.title}'`, 'success'))
  }

  const handleDelete = async (blog) => {
    if(window.confirm('Delete blog "' + blog.title + '"?')){
      try{
        dispatch(delete_Blog(blog))
        dispatch(notify('Blog deleted successfully', 'success'))
      }
      catch(error){
        dispatch(notify(error.message, 'error'))
      }
    }
  }

  const userAddedBlog = blog.user.id

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }

  return(
    <div style={blogStyle}>
      <div className="blog">
        <b>{blog.title}</b> - {blog.author}
      &ensp;
        <button onClick={() => setblogView(true)} style={hideWhenVisible} id="view">View</button>
        <button onClick={() => setblogView(false)} style={showWhenVisible} id="hide">Hide</button>
      </div>
      <div style={showWhenVisible} className="blog_detail">
        <span>
          <b>Url: </b>{blog.url}
        </span>
        <span>
          <b>Likes: </b>{blog.likes}&nbsp;
          <button className="likebtn" id="like" onClick={() => addLike(blog.id)}>like</button>
        </span>
        <span>
          <b>Added by: </b>
          {blog.user.user}
          &ensp;
          {(user.user.id === userAddedBlog) ?
            <button className="deletebtn" id="delete" onClick={() => handleDelete(blog)} style={showWhenVisible}>Remove Blog</button>
            :
            null
          }
        </span>
      </div>
    </div>
  )}
export default Blog