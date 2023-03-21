import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }
  const changeVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(refs, () => {
    return {
      changeVisibility
    }
  })
  return(
    <div>
      <div style={hideWhenVisible}>
        <button onClick={changeVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={changeVisibility}>cancel</button>
      </div>
    </div>
  )
})
Togglable.displayName = 'Togglable'
export default Togglable