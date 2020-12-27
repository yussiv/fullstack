import React, { useImperativeHandle, useState } from 'react'

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
  }
)
export default Togglable
