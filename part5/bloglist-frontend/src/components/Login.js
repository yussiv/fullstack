import React, { useState } from 'react'
import loginService from '../services/login'

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)
      handleLogin(user)
    } catch (err) {
      setErrorMsg(err.message)
    }
  }

  const ErrorMessage = () => (errorMsg && <p>{errorMsg}</p>)
  
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={username} 
            onChange={({target}) => { setUsername(target.value)}}
            />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={({target}) => { setPassword(target.value)}}
            />
        </div>
        <input type="submit" value="Login"/>
      </form>
      <ErrorMessage />
    </div>
  )
}

export default Login