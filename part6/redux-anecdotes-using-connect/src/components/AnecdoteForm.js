import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({ addAnecdote }) => {

  const add = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    addAnecdote(content)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input type="text" name="anecdote" /></div>
        <button>create</button>
      </form>
    </>
  )
}
export default connect(null, { addAnecdote })(AnecdoteForm)
