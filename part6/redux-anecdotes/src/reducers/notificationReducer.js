const initialState = { content: '', id: -1 }
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data
    case 'HIDE_NOTIFICATION':
      console.log(state)
      if (state.id !== action.id)
        return state
      else
        return initialState
    default:
      return state
  }
}

let id = 0

// unfortunate function signature in order to contain timeout logic inside reducer
export const addNotification = (dispatch, content) => {
  dispatch({
    type: 'SHOW_NOTIFICATION',
    data: {
      content, id: id
    }
  })

  setTimeout((id) => {
    dispatch({
      type: 'HIDE_NOTIFICATION', id
    })
  }, 5000, id)
  id++
}
export default reducer
