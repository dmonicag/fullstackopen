import { useState, useEffect } from 'react'
import './App.css'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [error_notif, setError] = useState(null)
  const [notif, setNotification] = useState(null)

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

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.Username.value
    const password = event.target.Password.value
    try{
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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

  const addBlog = (event) => {
    event.preventDefault()
    const title = event.target.title.value 
    const author = event.target.author.value
    const url = event.target.url.value
    const newBlog = {title: title, author:author, url:url}

    blogService
    .create(newBlog)
    .then(createdBlog => {
      setBlogs(blogs.concat(createdBlog))
      setNotification(`Blog '${newBlog.title}' added successfully`)
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
    event.target.reset()
}  

return(
  <div>
    <h1>BlogList App</h1>    
    <Notification error_message={error_notif} message={notif}/>
    {user === null ? 
    ( <>
      <h2>Log in to the application</h2>
     <LoginForm handleLogin={handleLogin}/>
      </>
    ) 
    :
    ( <>
      <p>
        Logged in as {user.user.user}&nbsp;
        <button onClick={handleLogout}>Log Out</button>
      </p>
      <BlogForm addBlog={addBlog}/>
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