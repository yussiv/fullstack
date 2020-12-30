import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const handleGoodClick = () => {
    store.dispatch({ type: 'GOOD' })
  }
  const handleNeutralClick = () => {
    store.dispatch({ type: 'OK' })
  }
  const handleBadClick = () => {
    store.dispatch({ type: 'BAD' })
  }
  const handleResetClick = () => {
    store.dispatch({ type: 'ZERO' })
  }

  return (
    <div>
      <button onClick={handleGoodClick}>good</button> 
      <button onClick={handleNeutralClick}>neutral</button> 
      <button onClick={handleBadClick}>bad</button>
      <button onClick={handleResetClick}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
