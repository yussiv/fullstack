import React from 'react'
import { Link } from 'react-router-dom'
import { LinkList } from '../components/styled'

const UserInfoView = ({ user }) => {
  if (!user) return null
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <LinkList>
        { user.blogs.map(blog => (
          <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
        ))}
      </LinkList>
    </div>
  )
}

export default UserInfoView
