import { useState, useEffect, useRef } from 'react'
import './App.css'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [error_notif, setError] = useState(null)
  const [notif, setNotification] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
      blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedUser')
    if(userJSON){
      const user = JSON.parse(userJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (loginObject) => {
    try{
      const user = await loginService.login(loginObject)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    }
    catch(exception){
      setError('Wrong username or password')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    window.location.reload()
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.changeVisibility()
    blogService
    .create(blogObject)
    .then(createdBlog => {
      setBlogs(blogs.concat(createdBlog))
      setNotification(`Blog '${blogObject.title}' added successfully`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    })
    .catch(error => {
      setError(error.response.data.error)
      setTimeout(() => {
        setError(null)
      }, 5000)
    })
}  

return(
  <div>
    <h1>BlogList App</h1>    
    <Notification error_message={error_notif} message={notif}/>
    {user === null ? 
    ( <>
      <h2>Log in to the application</h2>
     <LoginForm createLogin={handleLogin} />
      </>
    ) 
    :
    ( <>
      <p>
        Logged in as {user.user.user}&nbsp;
        <button onClick={handleLogout}>Log Out</button>
      </p>
      <Togglable buttonLabel='Add Blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <h2>List of blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </>
    )
    }
  </div>
)
}
export default App