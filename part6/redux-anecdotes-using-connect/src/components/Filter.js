import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = ({ setFilter }) => {
  const handleChange = (event) => {
    setFilter(event.target.value)
  }
  const style = {
    margin: '10px 0'
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(null, { setFilter })(Filter)