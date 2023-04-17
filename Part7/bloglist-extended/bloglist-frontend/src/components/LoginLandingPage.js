import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import UsersView from './UsersView'
import BlogList from './BlogList'
import UserInfo from './UserInfo'
import { logoutUser } from '../reducers/LoginReducer'
import Blog from './Blog'
import { Navbar, Nav } from 'react-bootstrap'

const LoginLandingPage = () => {
  const blogFormRef = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.loggedUser)
  const users = useSelector((state) => state.users)
  const blogs = useSelector(({ blogs }) => {
    const result = [...blogs].sort((a,b) => b.likes - a.likes)
    return result
  })

  const padding = {
    paddingRight: 5
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/',  { replace: true })
  }

  return(
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">Users</Link>
            </Nav.Link>

            <Nav.Link href="#" as="span">
              <Link style={padding} to="/blogs">Blogs</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

        Logged in as {user.user.user}&nbsp;
      <button onClick={handleLogout}>Log Out</button>
      <div>
        <Togglable buttonLabel='Add Blog' ref={blogFormRef}>
          <BlogForm toggleRef={blogFormRef} />
        </Togglable>
      </div>
      <Routes>
        <Route path="/users" element={<UsersView />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/users/:id" element={<UserInfo users={users}/>} />
        <Route path="/blogs/:id" element={<Blog blogs={blogs} user={user}/>} />
      </Routes>
    </div>
  )
}
export default LoginLandingPage