import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button style={{ backgroundColor: '#8ac926', color: '#011638' }} onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button style={{ backgroundColor: '#8ac926', color: '#011638' }} onClick={toggleVisibility}>Cancel</Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
