const Notification = ({ message, error_message }) => {
  if(message === null && error_message === null){
    return null
  }
  return (
    <div>
      { message ?
        (<div className="notification">{message}</div>)
        :
        <></>
      }
      { error_message ?
        (<div className="notification-error">{error_message}</div>)
        :
        <></>
      }
    </div>
  )
}
export default Notification