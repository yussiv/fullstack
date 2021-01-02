import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeBlog, updateBlog } from '../reducers/blog'
import { useHistory } from 'react-router-dom'
import CommentForm from '../components/CommentForm'
import { DangerousButton } from '../components/styled'

const BlogInfoView = ({ blog }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const login = useSelector(state => state.login)
  const handleClick = () => {
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }))
  }
  const handleRemove = () => {
    dispatch(removeBlog(blog))
    history.push('/')
  }

  if (!blog) return null
  return (
    <div className="blog-entry">
      <h2>{blog.title} by {blog.author}</h2>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>{blog.likes} likes <button className="like" onClick={handleClick}>like</button></p>
      <p>added by {blog.user.name}</p>
      {
        login.id === blog.user.id
          && <DangerousButton className="remove" onClick={handleRemove}>Remove</DangerousButton>
      }
      <h3>Comments</h3>
      <CommentForm blog={blog} />
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
