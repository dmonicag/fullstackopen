import {  useEffect } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/BlogReducer'
import { initializeUser } from './reducers/LoginReducer'
import { getAllUsers } from './reducers/UsersReducer'
import LoginLandingPage from './components/LoginLandingPage'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(getAllUsers())
  }, [dispatch])

  const user = useSelector((state) => state.loggedUser)

  return(
    <div className='container'>
      <h1>BlogList App</h1>
      <Notification/>
      {user === null ?
        <LoginForm/>
        :
        <LoginLandingPage/>
      }
    </div>
  )
}

export default App
