import React, { useState, useEffect, useRef } from 'react'
import { BlogList } from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import Login from './components/Login'
import { Notifications } from './components/Notification'
import blogService from './services/blogs'
import './App.css'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notifications, setNotifications] = useState([])
  const newBlogToggleRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('user')
    if (userJSON) {
      const savedUser = JSON.parse(userJSON)
      blogService.setToken(savedUser.token)
      setUser(savedUser)
    }
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

  const handleBlogCreated = (newBlog) => {
    setBlogs( [...blogs, newBlog])
    addNotification(
      `A new blog ${newBlog.title} by ${newBlog.author} added`,
      'success'
    )
    newBlogToggleRef.current.hide()
  }

  const addNotification = (text, type) => {
    setNotifications(n => [...n, {
      id: new Date().valueOf(), text, type
    }])
  }

  const removeNotification = (id) => {
    setNotifications(n => n.filter(i => i.id !== id))
  }

  return (
    <div>
      <Notifications notifications={notifications} handleRemove={removeNotification} />
      { user === null 
      ? <Login handleLogin={handleLogin} addNotification={addNotification} />
      : <div>
          <div>
            {user.name} logged in
            <button onClick={handleLogout}>Logout</button>
          </div>
          <Togglable buttonText="Create new blog" ref={newBlogToggleRef}>
            <NewBlogForm handleBlogCreated={handleBlogCreated} />
          </Togglable>
          <BlogList blogs={blogs} /> 
        </div>}
    </div>
  )
}

export default App