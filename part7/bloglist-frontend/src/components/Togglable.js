import React, { useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef(({ buttonText, children }, ref) => {
  const [visible, setVisible] = useState(false)

  const handleClick = () => {
    setVisible(!visible)
  }
  const hide = () => {
    setVisible(false)
  }

  useImperativeHandle(ref, () => ({ hide }))

  return visible
    ? (
      <>
        { children }
        <button onClick={handleClick}>cancel</button>
      </>
    )
    : <button onClick={handleClick}>{buttonText}</button>
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonText: PropTypes.string.isRequired
}

export default Togglable
