import React from 'react'
import { Link } from 'react-router-dom'
import { LinkList } from './styled'

const BlogList = ({ blogs }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  return (
    <LinkList>
      {
        sortedBlogs.map(blog => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`} className="blog-entry">{blog.title}</Link>
          </li>
        ))
      }
    </LinkList>
  )
}

export default BlogList
