import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
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
    try{
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch(exception){
      setError('Wrong credentials')
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

  const loginForm = () => (
    //sample username: aaron, password: Aaron123
      <form onSubmit={handleLogin}>
        <div>
          username <input type='text' value={username}
          name='Username' onChange={({target}) => setUsername(target.value)}/>
        </div>
        <div>
          password <input type='text' value={password}
          name='Password' onChange={({target}) => setPassword(target.value)}/>
        </div>
        <button type='submit'>Login</button>
      </form>
  )

  if(user === null){
    return(
      <div>
        <Notification error_message={error_notif} message={notif}/>
        <h2>Log in to the application</h2>
          {loginForm()}
      </div>
    )
  }
  return(
    <div>
      <h2>Blogs</h2>    
        <p>
          Logged in as {user.user.user}&nbsp;
          <button onClick={handleLogout}>Log Out</button>
        </p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )
}
export default App