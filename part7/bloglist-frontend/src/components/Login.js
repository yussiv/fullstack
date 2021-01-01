import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import { addNotification } from '../reducers/notification'

const Login = ({ handleLogin }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)
      handleLogin(user)
    } catch (err) {
      dispatch(addNotification(err.response.data.error, 'failure'))
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={username}
            onChange={({ target }) => { setUsername(target.value)}}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => { setPassword(target.value)}}
          />
        </div>
        <input type="submit" value="Login"/>
      </form>
    </div>
  )
}

export default Login