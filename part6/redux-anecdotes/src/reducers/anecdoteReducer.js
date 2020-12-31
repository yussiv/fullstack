const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map(item => (
        item.id === action.data.id
        ? { ...item, votes: item.votes + 1 }
        : item
      )).sort((a, b) => b.votes - a.votes)
    case 'ADD_NEW':
      return [...state, asObject(action.data.content)]
    case 'SET_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const addVote = (id) => {
  return { type: 'VOTE', data: { id }}
}

export const addAnecdote = (content) => {
  return { type: 'ADD_NEW', data: { content }}
}

export const setAnecdotes = (data) => {
  return { type: 'SET_ANECDOTES', data }
}

export default reducer
