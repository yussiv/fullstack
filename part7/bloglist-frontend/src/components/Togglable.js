import React, { useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from './styled'

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
      <div className="togglable open">
        { children }
        <Button className="close-button" onClick={handleClick}>cancel</Button>
      </div>
    )
    : (
      <div className="togglable closed">
        <Button onClick={handleClick}>{buttonText}</Button>
      </div>
    )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonText: PropTypes.string.isRequired
}

export default Togglable
