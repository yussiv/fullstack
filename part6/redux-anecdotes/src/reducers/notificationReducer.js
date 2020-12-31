const initialState = { content: '', id: -1 }
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data
    case 'HIDE_NOTIFICATION':
      if (state.id !== action.id)
        return state
      else
        return initialState
    default:
      return state
  }
}

let id = 0

export const setNotification = (content, seconds) => async (dispatch) => {
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
  }, 1000 * seconds, id)
  id++
}
export default reducer
