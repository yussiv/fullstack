const initialState = ''
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.value
    default:
      return state
  }
}

export const setFilter = (value) => {
  return {
    type: 'SET_FILTER', value
  }
}

export default reducer
