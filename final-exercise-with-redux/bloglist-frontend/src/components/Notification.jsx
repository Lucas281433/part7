import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import okImg from '../assets/create.png'
import errorImg from '../assets/404-not-found.png'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === null) {
    return null
  }

  if (notification.startsWith('A new')) {
    return (
      <Alert variant='success'>
        <img style={{ width: '50%', height: '50%' }} src={okImg} alt="" />
        {notification}
      </Alert>
    )
  }

  return (
    <Alert variant='danger'>
      <img style={{ width:'50%', height: '50%' }} src={errorImg} alt="" />
      {notification}
    </Alert>
  ) 
}

export default Notification
