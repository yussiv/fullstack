import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleBlogUpdated, handleBlogRemoved, user }) => {
  const [expanded, setExpanded] = useState(false)
  const { title, url, likes, author } = blog
  const toggleExpanded = () => {
    setExpanded(!expanded)
  }
  const handleLikeIncrease = async () => {
    handleBlogUpdated({ ...blog, likes: likes + 1 })
  }
  const handleRemove = async () => {
    if (window.confirm(`Remove blog '${title}' by ${author}?`)) {
      handleBlogRemoved(blog)
    }
  }
  const RemoveButton = () => {
    if (blog.user === user.id || blog.user.id === user.id) {
      return (
        <button onClick={handleRemove} className="button-remove">remove</button>
      )
    }
    return null
  }

  return (
    <div className="blog-entry">
      { expanded
        ? (
          <>
            <div className="title">{title} <button onClick={toggleExpanded}>show less</button></div>
            <div className="url">{url}</div>
            <div className="likes">
              likes {likes}
              <button onClick={handleLikeIncrease} className="button-like">like</button></div>
            <div className="author">{author}</div>
            <RemoveButton />
          </>
        )
        : (
          <>
            <span className="title">{title}</span> <span className="author">{author}</span>
            <button onClick={toggleExpanded}>show more</button>
          </>
        )
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleBlogUpdated: PropTypes.func.isRequired,
  handleBlogRemoved: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
