import React from 'react'

const Notification = ({ notification }) => notification && (
  <div style={{border: '1px solid green', color: 'green', padding: '3px 5px', margin: '10px 0'}}>
    { notification.content }
  </div>
)

export default Notification
