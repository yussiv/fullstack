import userService from '../services/user'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'SET_USERS':
    return action.data
  default:
    return state
  }
}

export const fetchUsers = () => async (dispatch) => {
  const users = await userService.getAll()
  dispatch({
    type: 'SET_USERS',
    data: users,
  })
}

export default reducer
