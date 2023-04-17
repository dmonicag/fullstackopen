import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/LoginReducer'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'

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
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Col xs={3}>
            <Form.Label>Username: </Form.Label>
            <Form.Control type='text'
              value={username}
              id='username'
              onChange={({ target }) => setUsername(target.value)} />
          </Col>
          <Col xs={3}>
            <Form.Label>Password: </Form.Label>
            <Form.Control type='text'
              value={password}
              id='password'
              onChange={({ target }) => setPassword(target.value)}/>
          </Col>
          <Button variant='primary' type='submit' id='loginbtn'>Login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}
export default LoginForm
