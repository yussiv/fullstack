import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Login from './components/Login'
import Notifications from './components/Notifications'
import BlogsView from './views/BlogsView'
import UsersView from './views/UsersView'
import UserInfoView from './views/UserInfoView'
import './App.css'
import { initBlogs } from './reducers/blog'
import { initLogin, unsetLogin } from './reducers/login'
import { fetchUsers } from './reducers/user'

const App = () => {
  const dispatch = useDispatch()
  const login = useSelector(state => state.login)
  const users = useSelector(state => state.users)
  const routeMatch = useRouteMatch('/users/:id')
  const userId = routeMatch ? routeMatch.params.id : null

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initLogin())
    dispatch(fetchUsers())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(unsetLogin())
  }

  const LoginInfo = ({ login }) => (
    <div>
      {login.name} logged in
      <button onClick={handleLogout}>Logout</button>
    </div>
  )

  const AuthorizedContent = ({ loggedIn, children }) => (
    <div>
      {loggedIn ? children : <Login />}
    </div>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notifications />
      <AuthorizedContent loggedIn={login !== null}>
        <LoginInfo login={login} />
        <Switch>
          <Route path="/users/:id">
            <UserInfoView user={users.find(user => user.id === userId)} />
          </Route>
          <Route path="/users">
            <UsersView users={users} />
          </Route>
          <Route path="/">
            <BlogsView />
          </Route>
        </Switch>
      </AuthorizedContent>
    </div>
  )
}

export default App