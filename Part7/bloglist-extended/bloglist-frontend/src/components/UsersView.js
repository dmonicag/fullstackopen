import { useSelector } from 'react-redux'
import '../App.css'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UsersView = () => {
  const users = useSelector(state => state.users)
  return(
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th scope="row">User</th>
            <th scope="row">Blogs Added</th>
          </tr>
        </thead>
        <tbody>
          {users.map(users =>
            <tr key={users.id}>
              <td>
                <Link to={`/users/${users.id}`}>{users.user}</Link></td>
              <td>{users.blogs.length}</td>
            </tr>)
          }
        </tbody>
      </Table>
    </div>
  )
}

export default UsersView