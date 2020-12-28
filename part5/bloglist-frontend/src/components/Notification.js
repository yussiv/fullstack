import React, { useEffect } from 'react'

const Notification = ({ notification, handleRemove }) => {
  useEffect(() => {
    const interval = notification.id + 5000 - new Date().valueOf()
    let timer
    if (interval > 0)
      timer = setTimeout(() => handleRemove(notification.id), interval)
    else
      handleRemove(notification.id)

    return (() => {
      if (timer)
        clearTimeout(timer)
    })
  })

  return (
    <div className={'notification ' + notification.type}>{notification.text}</div>
  )
}

const Notifications = ({ notifications, handleRemove }) => (
  notifications.map((n) => (
    <Notification
      key={n.id}
      notification={n}
      handleRemove={handleRemove}
    />
  ))
)

export { Notification, Notifications }