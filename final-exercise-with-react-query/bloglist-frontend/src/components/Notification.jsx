import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
  const message = useNotificationValue()

  if (message === null) {
    return null
  }

  if (message.startsWith('A new')) {
    return <div className="success">{message}</div>
  }

  return <div className="error">{message}</div>
}

export default Notification
