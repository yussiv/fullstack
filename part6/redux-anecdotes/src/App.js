import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => (
  <div>
    <h2>Important notification</h2>
    <Notification />
    <h2>Anecdotes</h2>
    <AnecdoteList />
    <AnecdoteForm />
  </div>
)

export default App
