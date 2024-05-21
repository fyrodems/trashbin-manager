import { App } from 'antd'
import useIdleTimeout from '../hooks/useIdleTimeout'
import { CountDownTimer } from '../CountDownTimer/CountDownTimer'
import styles from './SessionTimer.module.scss'
import { logout } from '@/auth/authClient'
import { useAuth } from '@/auth/authProvider'

export const SessionTimer = () => {
  const { setIdleLoggedOut, loggedIn } = useAuth()
  const { notification } = App.useApp()
  const key = 'notification'

  const warringMessageHandler = () => {
    if (!loggedIn) return

    notification.warning({
      message: 'Wkrótce nastąpi wylogowanie ',
      description: <CountDownTimer />,
      duration: 60,
      key,
      className: `${styles.notification}`,
      placement: 'top',
    })
  }

  const handleUserActivity = () => {
    notification.destroy(key)
  }

  const handleLogout = async () => {
    if (!loggedIn) return

    setIdleLoggedOut(true)
    await logout()
  }

  // warring about no activity idle timer
  useIdleTimeout({
    onIdle: warringMessageHandler,
    onAction: handleUserActivity,
    idleTime: 14, // time to warning user in minutes
  })

  // logout idle timer
  useIdleTimeout({
    onIdle: handleLogout,
    idleTime: 15, // time to logout user
  })

  return null
}
