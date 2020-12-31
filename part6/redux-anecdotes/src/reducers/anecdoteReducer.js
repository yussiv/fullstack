import anecdoteService from '../services/anecdote'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map(item => (
        item.id === action.id
        ? { ...item, votes: item.votes + 1 }
        : item
      )).sort((a, b) => b.votes - a.votes)
    case 'ADD_NEW':
      return [...state, action.data]
    case 'SET_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const addVote = (id) => {
  return { type: 'VOTE', id }
}

export const addAnecdote = (data) => {
  return { type: 'ADD_NEW', data }
}

export const initAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll()
  dispatch({
    type: 'SET_ANECDOTES',
    data: anecdotes
  })
}

export default reducer
