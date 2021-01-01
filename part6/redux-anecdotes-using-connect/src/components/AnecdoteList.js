import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ anecdotes, addVote }) => {
  const vote = (anecdote) => {
    addVote(anecdote)
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

const mapStateToProps = (state) => ({
  anecdotes: state.anecdotes.filter(item => item.content.includes(state.filter)),
})

const mapDispatchToProps = { addVote }

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
