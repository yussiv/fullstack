import React from 'react'
import { Link } from 'react-router-dom'

const UsersView = ({ users }) => (
  <div>
    <h2>Users</h2>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map(user => (
            <tr key={user.name}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
)

export default UsersView
