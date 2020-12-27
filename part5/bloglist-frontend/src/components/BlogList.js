import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, handleBlogUpdated, handleBlogRemoved, user }) => {
  const sortedBlogs = [...blogs].sort((a, b) => a.likes < b.likes)
  return (
    <div>
      <h2>blogs</h2>
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleBlogUpdated={handleBlogUpdated}
          handleBlogRemoved={handleBlogRemoved}
          user={user}
        />
      )}
    </div>
  )
}

export default BlogList
