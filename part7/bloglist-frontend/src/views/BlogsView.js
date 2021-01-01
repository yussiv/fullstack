import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addBlog, removeBlog, updateBlog } from '../reducers/blog'
import BlogList from '../components/BlogList'
import NewBlogForm from '../components/NewBlogForm'
import Togglable from '../components/Togglable'

const BlogsView = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const newBlogToggleRef = useRef()

  const handleBlogCreated = async (blog) => {
    dispatch(addBlog(blog))
    newBlogToggleRef.current.hide()
  }

  const handleBlogUpdated = async (updatedBlog) => {
    dispatch(updateBlog(updatedBlog))
  }

  const handleBlogRemoved = async (blogToRemove) => {
    dispatch(removeBlog(blogToRemove))
  }

  return (
    <>
      <Togglable buttonText="Create new blog" ref={newBlogToggleRef}>
        <NewBlogForm handleBlogCreated={handleBlogCreated} />
      </Togglable>
      <BlogList
        blogs={blogs}
        handleBlogUpdated={handleBlogUpdated}
        handleBlogRemoved={handleBlogRemoved}
      />
    </>
  )
}

export default BlogsView
