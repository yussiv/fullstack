import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import BlogList from './components/BlogList'
import NewBlogForm from './components/NewBlogForm'
import Login from './components/Login'
import Notifications from './components/Notifications'
import blogService from './services/blogs'
import './App.css'
import Togglable from './components/Togglable'
import { addNotification } from './reducers/notification'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const newBlogToggleRef = useRef()


  useEffect(() => {
    const userJSON = window.localStorage.getItem('user')
    if (userJSON) {
      const savedUser = JSON.parse(userJSON)
      blogService.setToken(savedUser.token)
      setUser(savedUser)
    }
  }, [])

  useEffect(() => {
    const getBlogs = async () => {
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
    }
    getBlogs()
  }, [])

  const handleLogin = (user) => {
    window.localStorage.setItem('user', JSON.stringify(user))
    blogService.setToken(user.token)
    setUser(user)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    blogService.setToken('')
    setUser(null)
  }

  const handleBlogCreated = async (blog) => {
    const newBlog = await blogService.create(blog)
    setBlogs([...blogs, newBlog])
    dispatch(addNotification(
      `A new blog ${newBlog.title} by ${newBlog.author} added`,
      'success'
    ))
    newBlogToggleRef.current.hide()
  }

  const handleBlogUpdated = async (updatedBlog) => {
    const responseBlog = await blogService.update(updatedBlog)
    setBlogs(blogs.map((blog) => blog.id === updatedBlog.id ? responseBlog : blog))
  }

  const handleBlogRemoved = async (blogToRemove) => {
    await blogService.remove(blogToRemove)
    setBlogs(blogs.filter((blog) => blog.id !== blogToRemove.id))
  }

  return (
    <div>
      <Notifications />
      { user === null
        ? <Login handleLogin={handleLogin} />
        : <div>
          <div>
            {user.name} logged in
            <button onClick={handleLogout}>Logout</button>
          </div>
          <Togglable buttonText="Create new blog" ref={newBlogToggleRef}>
            <NewBlogForm handleBlogCreated={handleBlogCreated} />
          </Togglable>
          <BlogList
            blogs={blogs}
            handleBlogUpdated={handleBlogUpdated}
            handleBlogRemoved={handleBlogRemoved}
            user={user}
          />
        </div>}
    </div>
  )
}

export default App