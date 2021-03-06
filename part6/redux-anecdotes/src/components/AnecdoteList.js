import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(
    state => state.anecdotes.filter(item => item.content.includes(filter))
  )
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(addVote(anecdote))
  }

  return anecdotes.map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

export default AnecdoteList
