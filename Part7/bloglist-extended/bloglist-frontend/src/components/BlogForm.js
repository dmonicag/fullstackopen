import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title: title, author: author, url: url })
    event.target.reset()
  }

  return (
    <form onSubmit={addBlog} className="formDiv">
      <div>
        <h2>Add a new Blog</h2>
        <p>
          Title:{' '}
          <input
            type="text"
            value={title}
            id="title"
            placeholder="enter title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </p>
        <p>
          Author:{' '}
          <input
            type="text"
            value={author}
            id="author"
            placeholder="enter author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </p>
        <p>
          {' '}
          URL:{' '}
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
