import React from 'react'


const Header = ({text}) => <h1>{text}</h1>

const Part = ({info}) => <p>{info.name} {info.exercises}</p>

const Content = ({parts}) => (
  parts.map(part => <Part key={part.id} info={part} />)
)

const Total = ({parts}) => {
  const count = parts.reduce((sum, acc) => sum + acc.exercises, 0)
  return <p><strong>total of {count} exercises</strong></p>
}

const Course = ({course}) => {

  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course