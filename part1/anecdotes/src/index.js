import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const argMax = (array) => {
  let max = array[0]
  let maxInd = 0
  for (let i = 1; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i]
      maxInd = i
    }
  }
  return maxInd
}

const Anecdote = ({text, votes}) => (
  <div>
    <div>{text}</div>
    <div>has {votes} votes</div>
  </div>
)

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const mostVoted = argMax(votes)


  const handleNext = () => {
    const step = 1 + Math.floor(Math.random() * (anecdotes.length - 1))
    setSelected((selected + step) % anecdotes.length)
  }

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <div>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleNext}>next random anecdote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      <Anecdote text={anecdotes[mostVoted]} votes={votes[mostVoted]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)