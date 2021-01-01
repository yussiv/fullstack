import blogService from '../services/blog'

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_LOGIN':
    return action.data
  case 'UNSET_LOGIN':
    return null
  default:
    return state
  }
}

export const setLogin = (user) => (dispatch) => {
  blogService.setToken(user.token)
  window.localStorage.setItem('user', JSON.stringify(user))
  dispatch({
    type: 'SET_LOGIN',
    data: user,
  })
}

export const unsetLogin = () => (dispatch) => {
  window.localStorage.removeItem('user')
  blogService.setToken('')
  dispatch({ type: 'UNSET_LOGIN' })
}

export const initLogin = () => (dispatch) => {
  const userJSON = window.localStorage.getItem('user')
  if (userJSON) {
    dispatch(setLogin(JSON.parse(userJSON)))
  }
}

export default reducer
