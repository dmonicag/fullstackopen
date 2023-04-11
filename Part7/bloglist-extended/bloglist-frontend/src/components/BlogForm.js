import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/NotificationReducer'
import { addNewBlog } from '../reducers/BlogReducer'

const BlogForm = ({ toggleRef }) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const addBlog = async (event) => {
    event.preventDefault()
    toggleRef.current.changeVisibility()
    const new_Blog = { title: title, author: author, url: url }
    setTitle('')
    setAuthor('')
    setUrl('')
    try{
      dispatch(addNewBlog(new_Blog))
      dispatch(notify(`Blog '${new_Blog.title}' added successfully`, 'success'))
    }
    catch(error) {
      dispatch(notify(error.message, 'error'))
    }
  }

  return (
    <form onSubmit={addBlog} className="formDiv">
      <div>
        <h2>Add a new Blog</h2>
        <p>
          Title:
          <input
            type="text"
            value={title}
            id="title"
            placeholder="enter title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </p>
        <p>
          Author:
          <input
            type="text"
            value={author}
            id="author"
            placeholder="enter author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </p>
        <p>
          URL:
          <input
            type="text"
            value={url}
            id="url"
            placeholder="enter url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </p>
        <p>
          <button id="add-blog" type="submit">
            Add Blog
          </button>
        </p>
      </div>
    </form>
  )
}
export default BlogForm
