import React from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog } from '../reducers/blog'

const BlogInfoView = ({ blog }) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }))
  }

  if (!blog) return null
  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>{blog.likes} <button onClick={handleClick}>like</button></p>
      <p>added by {blog.user.name}</p>
    </div>
  )
}

export default BlogInfoView
