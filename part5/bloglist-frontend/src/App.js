import React, { useState, useEffect } from 'react'
import { BlogList } from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = (user) => {
    setUser(user)
  }

  return (
    <div>
      { user === null 
      ? <Login handleLogin={handleLogin} />
      : <div>
          <p>{user.name} logged in</p>
          <BlogList blogs={blogs} /> 
        </div>}
    </div>
  )
}

export default App