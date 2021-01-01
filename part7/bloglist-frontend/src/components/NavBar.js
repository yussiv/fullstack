import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { unsetLogin } from '../reducers/login'

const Nav = styled.nav`
  background-color: #b4dab9;
  padding: 5px 10px;
  & a, & .logged-user {
    display: inline-block;
    padding: 3px 20px 3px 0;
    color: #000;
  }
`

const NavBar = ({ login }) => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(unsetLogin())
  }
  return (
    <Nav>
      <Link to="/">Blogs</Link>
      <Link to="/users">Users</Link>
      <span className="logged-user">
        {login.name} logged in <button onClick={handleLogout}>logout</button>
      </span>
    </Nav>
  )
}

export default NavBar
