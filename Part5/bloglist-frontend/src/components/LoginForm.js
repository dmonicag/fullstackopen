const LoginForm = ({handleLogin}) => {
  //sample username: aaron, password: Aaron123
  return(
  <form onSubmit={handleLogin}>
   <div><p>
     username <input type='text' 
     name='Username' />
    </p></div>
    <div><p>
      password <input type='text' 
      name='Password' />
    </p></div>
    <button type='submit'>Login</button>
  </form>
  )
}
 export default LoginForm 
