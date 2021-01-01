
const reducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_NOTIFICATION':
    return state.concat(action.data)
  case 'REMOVE_NOTIFICATION':
    return state.filter(n => n.id !== action.id)
  default:
    return state
  }
}

let id = 0

export const addNotification = (content, variant, seconds = 5) => (dispatch) => {
  dispatch({
    type: 'ADD_NOTIFICATION',
    data: { id, content, variant }
  })

  setTimeout((id) => {
    dispatch({
      type: 'REMOVE_NOTIFICATION',
      id
    })
  }, 1000 * seconds, id)
  id++
}

export default reducer
