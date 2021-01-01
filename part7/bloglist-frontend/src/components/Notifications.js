import React from 'react'
import { useSelector } from 'react-redux'

const Notifications = () => {
  const notifications = useSelector(state => state.notifications)

  return notifications.map((notification) => (
    <div
      key={notification.id}
      className={'notification ' + notification.variant}
    >
      {notification.content}
    </div>
  ))
}

export default Notifications
