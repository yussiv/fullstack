import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../reducers/user'

const UsersView = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
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
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default UsersView
