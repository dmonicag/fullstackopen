import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  return (
    <div>
      { notification.type === 'success' ?
        (<div className="notification">{notification.message}</div>)
        :
        <></>
      }
      { notification.type === 'error' ?
        (<div className="notification-error">{notification.message}</div>)
        :
        <></>
      }
    </div>
  )
}

export default Notification