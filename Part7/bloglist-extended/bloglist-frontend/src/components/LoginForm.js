import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/LoginReducer'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault()
    const credentials = {
      username:username,
      password:password
    }
    event.target.reset()
    dispatch(loginUser(credentials))
    navigate('/')
  }

  return(
    <div>
      <h2>Log in to the application</h2>
      <form onSubmit={handleLogin}>
        <div><p>
      username <input type='text'
            value={username}
            id='username'
            onChange={({ target }) => setUsername(target.value)} />
        </p></div>
        <div><p>
        password <input type='text'
            value={password}
            id='password'
            onChange={({ target }) => setPassword(target.value)}/>
        </p></div>
        <button type='submit' id='loginbtn'>Login</button>
      </form>
    </div>
  )
}
export default LoginForm
