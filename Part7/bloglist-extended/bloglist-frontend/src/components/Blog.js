import { add_comment, add_Like, delete_Blog } from '../reducers/BlogReducer'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/NotificationReducer'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Blog = ({ blogs, user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = useParams().id
  const [comment, setComment] = useState('')

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

  const handleComment = async (comment, id) => {
    if(comment.length < 8){
      dispatch(notify('comments must have atleast 8 characters', 'error'))
    }
    else{
      const new_comment = { comments: comment }
      try{
        dispatch(add_comment(new_comment, id))
        dispatch(notify('comment added successfully', 'success'))
        setComment('')
      }
      catch(e){
        dispatch(notify(e.message, 'error'))
      }
    }
  }

  const displayComments = () => (
    blog.comments.map((c, index) =>
      <ul key={index}>
        <li>
          {c}
        </li>
      </ul>)
  )

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
      <div>
        <p>Add Comment:</p>
        <p><textarea value={comment} onChange={({ target }) => setComment(target.value)}></textarea></p>
        <input type="submit" value="Submit" onClick={() => handleComment(comment,id)}></input>
      </div>
      <div>
        <h3>Comments:</h3>
        {blog.comments.length === 0 ?
          <div>No comments available.</div>
          :
          displayComments()
        }
      </div>
    </div>
  )
}
export default Blog