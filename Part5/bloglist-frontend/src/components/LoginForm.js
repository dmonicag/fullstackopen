import { useState } from "react"

const LoginForm = ({createLogin}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()    
    createLogin({username:username, 
                password:password})                
    event.target.reset()
  }

  return(
  <form onSubmit={handleLogin}>
   <div><p>
     username <input type='text' 
                     name='Username'
                     value={username} 
                     onChange={({target}) =>setUsername(target.value)} />
    </p></div>
    <div><p>
      password <input type='text'
                      name='Password'
                      value={password}
                      onChange={({target}) =>setPassword(target.value)}/>
    </p></div>
    <button type='submit'>Login</button>
  </form>
  )
}
export default LoginForm 
