import React from 'react'
import { useSelector } from 'react-redux'

const style = {
  border: 'solid',
  padding: 10,
  borderWidth: 1
}

const Notification = () => {
  const notification = useSelector(state => state.notification)
  return (
    <div style={style}>
      { notification.content }
    </div>
  )
}

export default Notification
