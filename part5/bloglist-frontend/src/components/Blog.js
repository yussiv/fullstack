import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, handleBlogUpdated }) => {
  const [expanded, setExpanded] = useState(false)
  const { title, url, likes, author } = blog
  const toggleExpanded = () => {
    setExpanded(!expanded)
  }
  const handleLikeIncrease = async () => {
    const updatedBlog = await blogService.update({ ...blog, likes: likes + 1 })
    handleBlogUpdated(updatedBlog)
  }
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
