import anecdoteService from '../services/anecdote'
import { addNotification } from '../reducers/notificationReducer'

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

export const addAnecdote = (content) => async (dispatch) => {
  const newAnecdote = await anecdoteService.add({ content, votes: 0 })
  dispatch({
    type: 'ADD_NEW',
    data: newAnecdote
  })
  const notification = `you added '${newAnecdote.content}'`
  addNotification(dispatch, notification)
}

export const initAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll()
  dispatch({
    type: 'SET_ANECDOTES',
    data: anecdotes
  })
}

export default reducer
