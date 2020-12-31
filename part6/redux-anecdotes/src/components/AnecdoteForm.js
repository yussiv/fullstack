import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = (event) => {
    event.preventDefault()
    const newAnecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(newAnecdote))
    const notification = `you added '${newAnecdote}'`
    addNotification(dispatch, notification)
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
export default AnecdoteForm