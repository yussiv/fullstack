import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdote'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    const newAnecdote = await anecdoteService.add({ content, votes: 0 })

    dispatch(addAnecdote(newAnecdote))
    const notification = `you added '${newAnecdote.content}'`
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
