import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({title}) => <h1>{title}</h1>

const Button = ({name, handleClick}) => <button onClick={handleClick}>{name}</button>

const Statistic = ({name, value, asPercentage}) => {
  if (asPercentage) {
    value = 100 * value + " %"
  }
  return <tr><td>{name}</td><td>{value}</td></tr>
}

const Statistics = props => {
  const [good, bad, neutral] = props.stats
  const all = good + bad + neutral

  if (all === 0)
    return <p>No feedback given</p>

  return (
    <table>
      <tbody>
        <Statistic name="good" value={good} />
        <Statistic name="neutral" value={neutral} />
        <Statistic name="bad" value={bad} />
        <Statistic name="all" value={all} />
        <Statistic name="average" value={(good - bad)/all} />
        <Statistic name="positive" value={good/all} asPercentage={true} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <Header title="give feedback" />
      <Button name="good" handleClick={handleGood} />
      <Button name="neutral" handleClick={handleNeutral}  />
      <Button name="bad" handleClick={handleBad}  />
      <Header title="statistics" />
      <Statistics stats={[good, bad, neutral]} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)