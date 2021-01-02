import React from 'react'
import { Link } from 'react-router-dom'
import { Table, TableHead, TableRow } from '../components/styled'

const UsersView = ({ users }) => (
  <div>
    <h2>Users</h2>
    <Table>
      <TableHead>
        <TableRow>
          <th></th>
          <th>blogs created</th>
        </TableRow>
      </TableHead>
      <tbody>
        {
          users.map(user => (
            <TableRow key={user.name}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </TableRow>
          ))
        }
      </tbody>
    </Table>
  </div>
)

export default UsersView
