import {  useEffect } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/BlogReducer'
import { initializeUser } from './reducers/UserReducer'
import DisplayBlogList from './components/DisplayBlogList'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  const user = useSelector((state) => state.user)

  return(
    <div>
      <h1>BlogList App</h1>
      <Notification/>
      {user === null ?
        <LoginForm/>
        :
        <DisplayBlogList/>
      }
    </div>
  )}

export default App
