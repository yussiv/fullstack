import anecdoteService from '../services/anecdote'
import { setNotification } from '../reducers/notificationReducer'

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

export const addVote = (anecdote) => async (dispatch) => {
  const updatedAnecdote = await anecdoteService.put({ ...anecdote, votes: anecdote.votes + 1 })
  dispatch({
    type: 'VOTE',
    id: updatedAnecdote.id
  })
  const notification = `you voted '${updatedAnecdote.content}'`
  dispatch(setNotification(notification, 5))
}

export const addAnecdote = (content) => async (dispatch) => {
  const newAnecdote = await anecdoteService.add({ content, votes: 0 })
  dispatch({
    type: 'ADD_NEW',
    data: newAnecdote
  })
  const notification = `you added '${newAnecdote.content}'`
  dispatch(setNotification(notification, 3))
}

export const initAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll()
  dispatch({
    type: 'SET_ANECDOTES',
    data: anecdotes
  })
}

export default reducer
