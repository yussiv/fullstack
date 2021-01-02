import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { unsetLogin } from '../reducers/login'
import { Navigation } from './styled'


const NavBar = ({ login }) => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(unsetLogin())
  }
  return (
    <Navigation>
      <div className="links">
        <Link to="/">Blogs</Link>
        <Link to="/users">Users</Link>
      </div>
      <div className="logged-user">
        {login.name} logged in <button onClick={handleLogout}>logout</button>
      </div>
    </Navigation>
  )
}

export default NavBar
