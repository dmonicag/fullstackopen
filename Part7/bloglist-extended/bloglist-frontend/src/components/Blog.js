import { add_Like, delete_Blog } from '../reducers/BlogReducer'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/NotificationReducer'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blogs, user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = useParams().id

  const blog = blogs.find(u => u.id === id)
  const userAddedBlog = blog.user.id

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
        navigate('/blogs')
      }
      catch(error){
        dispatch(notify(error.message, 'error'))
      }
    }
  }

  return(
    <div>
      <div>
        <h3>{blog.title} by {blog.author}</h3>
        <b>Url: </b><a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        <b>Likes: </b>{blog.likes}&nbsp;
        <button className="likebtn" id="like" onClick={() => addLike(blog.id)}>like</button>
      </div>
      <div>
        <b>Added by: </b>
        {blog.user.user}
          &ensp;
        {(user.user.id === userAddedBlog) ?
          <button className="deletebtn" id="delete" onClick={() => handleDelete(blog)}>Remove Blog</button>
          :
          null
        }
      </div>
    </div>
  )
}
export default Blog