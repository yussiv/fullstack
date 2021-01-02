import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Notifications from './components/Notifications'
import BlogsView from './views/BlogsView'
import UsersView from './views/UsersView'
import UserInfoView from './views/UserInfoView'
import BlogInfoView from './views/BlogInfoView'
import NavBar from './components/NavBar'
import AuthenticatedContent from './components/AuthenticatedContent'
import './App.css'
import { initBlogs } from './reducers/blog'
import { initLogin } from './reducers/login'
import { fetchUsers } from './reducers/user'
import { Header, ContentArea } from './components/styled'

const App = () => {
  const dispatch = useDispatch()
  const login = useSelector(state => state.login)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)
  const userIdMatch = useRouteMatch('/users/:id')
  const blogIdMatch = useRouteMatch('/blogs/:id')
  const userId = userIdMatch ? userIdMatch.params.id : null
  const blogId = blogIdMatch ? blogIdMatch.params.id : null

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initLogin())
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <div>
      <AuthenticatedContent loggedIn={login !== null}>
        <Header>
          <h1>Blogs</h1>
          <NavBar login={login} />
        </Header>
        <ContentArea>
          <Notifications />
          <Switch>
            <Route path="/blogs/:id">
              <BlogInfoView blog={blogs.find(blog => blog.id === blogId)} />
            </Route>
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
        </ContentArea>
      </AuthenticatedContent>
    </div>
  )
}

export default App