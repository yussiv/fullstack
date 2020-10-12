import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
)

const BlogList = ({ blogs }) => (
  <div>
    <h2>blogs</h2>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>
)

const NewBlogForm = ({ handleBlogCreated }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const clearForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newBlog = { title, author, url }
    await blogService.create(newBlog)
    clearForm()
    handleBlogCreated(newBlog)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Blog</h2>
      <div>
        <label htmlFor="title">Title</label>
        <input 
          id="title"
          value={title}
          onChange={({target}) => { setTitle(target.value) }}
          />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input 
          id="author"
          value={author}
          onChange={({target}) => { setAuthor(target.value) }}
          />
      </div>
      <div>
        <label htmlFor="url">URL</label>
        <input 
          id="url"
          value={url}
          onChange={({target}) => { setUrl(target.value) }}
          />
      </div>
      <input type="submit" value="Create" />
    </form>
  )
}

export { Blog, BlogList, NewBlogForm }
