import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import NewBlogForm from './components/NewBlogForm'
import Login from './components/Login'
import Notifications from './components/Notifications'
import './App.css'
import Togglable from './components/Togglable'
import { addBlog, initBlogs, removeBlog, updateBlog } from './reducers/blog'
import { initUser, setUser, unsetUser } from './reducers/user'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const newBlogToggleRef = useRef()

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUser())
  }, [dispatch])

  const handleLogin = (user) => {
    dispatch(setUser(user))
  }

  const handleLogout = () => {
    dispatch(unsetUser())
  }

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