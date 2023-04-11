import BlogForm from './BlogForm'
import Togglable from './Togglable'
import Blog from './Blog'
import { useRef } from 'react'
import { useSelector } from 'react-redux'

const DisplayBlogList = () => {
  const blogFormRef = useRef()
  const user = useSelector((state) => state.user)
  const blogs = useSelector(({ blogs }) => {
    const result = [...blogs].sort((a,b) => b.likes - a.likes)
    return result
  })

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    window.location.reload()
  }

  return(
    <div>
      <p>
        Logged in as {user.user.user}&nbsp;
        <button onClick={handleLogout}>Log Out</button>
      </p>
      <Togglable buttonLabel='Add Blog' ref={blogFormRef}>
        <BlogForm toggleRef={blogFormRef} />
      </Togglable>
      <div>
        <h2>List of blogs</h2>
        {blogs
          .map(blog =>
            <Blog key={blog.id}
              blog={blog}
              user={user}
            />
          )}
      </div>
    </div>
  )
}

export default DisplayBlogList