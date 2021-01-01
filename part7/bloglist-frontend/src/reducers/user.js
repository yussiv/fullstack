import blogService from '../services/blog'

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  case 'UNSET_USER':
    return null
  default:
    return state
  }
}

export const setUser = (user) => (dispatch) => {
  blogService.setToken(user.token)
  window.localStorage.setItem('user', JSON.stringify(user))
  dispatch({
    type: 'SET_USER',
    data: user,
  })
}

export const unsetUser = () => (dispatch) => {
  window.localStorage.removeItem('user')
  blogService.setToken('')
  dispatch({ type: 'UNSET_USER' })
}

export const initUser = () => (dispatch) => {
  const userJSON = window.localStorage.getItem('user')
  if (userJSON) {
    dispatch(setUser(JSON.parse(userJSON)))
  }
}

export default reducer
