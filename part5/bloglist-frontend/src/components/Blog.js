import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => {
    setExpanded(!expanded)
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
            likes {blog.likes} <button>like</button>
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
