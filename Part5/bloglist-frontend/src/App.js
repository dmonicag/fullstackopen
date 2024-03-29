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
  const [refreshData, setRefreshData] = useState(false)
  const blogFormRef = useRef()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )}, [refreshData])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedUser')
    if(userJSON){
      const user = JSON.parse(userJSON)
      setUser(user)
    }}, [])

  const notifySuccess = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const notifyError = (error_message) => {
    setError(error_message)
    setTimeout(() => {
      setError(null)
    }, 5000)
  }

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
      notifyError('Wrong username or password')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    window.location.reload()
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.changeVisibility()
    try{
      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog))
      notifySuccess(`Blog '${blogObject.title}' added successfully`)
    }
    catch(error) {
      notifyError(error.response.data.error)
    }
    setRefreshData(!refreshData)
  }

  const updateLike = async (likeObject, id) => {
    try{
      await blogService.updateLikes(likeObject, id)
      const updatedObject = blogs.map(blog => blog.id !== likeObject.id ? blog : likeObject)
      setBlogs(updatedObject)
    }
    catch(error){
      notifyError(error.response.data.error)
    }
  }

  const deleteBlog = async (id) => {
    const blogtoDelete = blogs.find(b => b.id === id)
    const copy=[...blogs]
    const index = blogs.indexOf(blogtoDelete)
    if(window.confirm('delete blog?')){
      try{
        await blogService.deleteBlog(id)
        copy.splice(index, 1)
        setBlogs(copy)
        notifySuccess('Blog deleted successfully')
      }
      catch(error){
        notifyError(error.response.data.error)
      }
    }
  }

  const displayBlog = () => (
    <div>
      <h2>List of blogs</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id}
            blog={blog}
            addLike={updateLike}
            handleDelete={() => deleteBlog(blog.id)}
            user={user}
          />
        )}
    </div>
  )

  const displayLoginForm= () => (
    <div>
      <h2>Log in to the application</h2>
      <LoginForm createLogin={handleLogin} />
    </div>
  )

  const displayBlogList = () => (
    <div>
      <p>
        Logged in as {user.user.user}&nbsp;
        <button onClick={handleLogout}>Log Out</button>
      </p>
      <Togglable buttonLabel='Add Blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {displayBlog()}
    </div>
  )

  return(
    <div>
      <h1>BlogList App</h1>
      <Notification error_message={error_notif} message={notif}/>
      {user === null ?
        displayLoginForm()
        :
        displayBlogList()
      }
    </div>
  )}

export default App