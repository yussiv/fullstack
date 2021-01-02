import React from 'react'
import Login from './Login'
import Notifications from './Notifications'

const AuthenticatedContent = ({ loggedIn, children }) => (
  <div>
    {
      loggedIn ? children : (
        <>
          <Notifications />
          <Login />
        </>
      )
    }
  </div>
)

export default AuthenticatedContent
