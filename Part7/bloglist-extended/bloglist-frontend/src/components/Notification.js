import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  return (
    <div>
      { notification.type === 'success' ?
        //(<div className="notification">{notification.message}</div>)
        (<Alert variant="success">{notification.message}</Alert>)
        :
        <></>
      }
      { notification.type === 'error' ?
        (<Alert variant="danger">{notification.message}</Alert>)
        :
        <></>
      }
    </div>
  )
}

export default Notification