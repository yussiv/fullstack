import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const toggleExpanded = () => {
    setExpanded(!expanded)
  }
  const handleLikeIncrease = async () => {
    const updatedBlog = await blogService.update({ ...blog, likes: likes + 1 })
    setLikes(updatedBlog.likes)
  }
  return (
    <div className="blog-entry">
      { expanded
        ? (
          <>
            {blog.title} <button onClick={toggleExpanded}>show less</button>
            <br />
            {blog.url} 
            <br />
            likes {likes} <button onClick={handleLikeIncrease}>like</button>
            <br />
            {blog.author}
          </>
        )
        : (
          <>
            {blog.title} {blog.author} 
            <button onClick={toggleExpanded}>show more</button>
          </>
        )
      }
    </div>
  )
}

export default Blog
