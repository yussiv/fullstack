import React from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog } from '../reducers/blog'

const BlogInfoView = ({ blog }) => {
  const dispatch = useDispatch()
  console.log(blog)
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
      <h3>Comments</h3>
      <ul>
        {
          blog.comments.map(comment => (
            <li key={comment.id}>{comment.content}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default BlogInfoView
