import { useReducer, useContext, createContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.payload
    case 'HIDE_NOTIFICATION':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notificaton, notificatonDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notificaton, notificatonDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}
