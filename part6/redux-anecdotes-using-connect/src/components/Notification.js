import React from 'react'
import { connect } from 'react-redux'

const style = {
  border: '1px solid green',
  color: 'green',
  padding: 10,
}

const Notification = ({ notification }) => {
  return notification.content && (
    <div style={style}>
      { notification.content }
    </div>
  )
}

const mapStateToProps = (state) => ({
  notification: state.notification,
})

export default connect(mapStateToProps)(Notification)
