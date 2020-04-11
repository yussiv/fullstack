import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = ({course}) => (
    <div>
      <h1>{course}</h1>
    </div>
  )

  const Part = ({info}) => (
    <p>{info.name} {info.exercises}</p>
  )

  const Content = ({parts}) => (
    parts.map(part => <Part key={part.name} info={part} />)
  )

  const Total = ({parts}) => {
    const count = parts.reduce((sum, acc) => sum + acc.exercises, 0)
    return <p>Number of exercises {count}</p>
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))