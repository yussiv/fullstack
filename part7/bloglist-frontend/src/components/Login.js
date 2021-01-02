import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import { addNotification } from '../reducers/notification'
import { setLogin } from '../reducers/login'
import { FormWrapper, InputRow } from './styled'

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)
      dispatch(setLogin(user))
    } catch (err) {
      dispatch(addNotification(err.response.data.error, 'failure'))
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <InputRow>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              value={username}
              onChange={({ target }) => { setUsername(target.value)}}
            />
          </InputRow>
          <InputRow>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={({ target }) => { setPassword(target.value)}}
            />
          </InputRow>
          <input type="submit" value="Login"/>
        </form>
      </FormWrapper>
    </div>
  )
}

export default Login