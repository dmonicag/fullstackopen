import { useParams, Link } from 'react-router-dom'
const UserInfo = ({ users }) => {
  const id = useParams().id
  const user = users.find(u => u.id === id)
  if (!user) {
    return null
  }
  return(
    <div>
      <h3>Added Blogs</h3>
      {user.blogs.map(u => (
        <ul key={u.id}>
          <li>
            <Link to={`/blogs/${u.id}`}>{u.title}</Link>
          </li>
        </ul>
      ))}
    </div>
  )
}

export default UserInfo
