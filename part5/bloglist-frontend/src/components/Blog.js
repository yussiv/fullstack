import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, handleBlogUpdated, handleBlogRemoved, user }) => {
  const [expanded, setExpanded] = useState(false)
  const { title, url, likes, author } = blog
  const toggleExpanded = () => {
    setExpanded(!expanded)
  }
  const handleLikeIncrease = async () => {
    const updatedBlog = await blogService.update({ ...blog, likes: likes + 1 })
    handleBlogUpdated(updatedBlog)
  }
  const handleRemove = async () => {
    if (window.confirm(`Remove blog '${title}' by ${author}?`)) {
      await blogService.remove(blog)
      handleBlogRemoved(blog)
    }
  }
  const RemoveButton = () => {
    if (blog.user === user.id || blog.user.id === user.id) {
      return (
        <button onClick={handleRemove} style={{ backgroundColor: '#ffe9e9' }}>remove</button>
      )
    }
    return null
  }
  console.log(blog, user)

  return (
    <div className="blog-entry">
      { expanded
        ? (
          <>
            {title} <button onClick={toggleExpanded}>show less</button>
            <br />
            {url} 
            <br />
            likes {likes} <button onClick={handleLikeIncrease}>like</button>
            <br />
            {author}
            <br />
            <RemoveButton />
          </>
        )
        : (
          <>
            {title} {author} 
            <button onClick={toggleExpanded}>show more</button>
          </>
        )
      }
    </div>
  )
}

export default Blog
