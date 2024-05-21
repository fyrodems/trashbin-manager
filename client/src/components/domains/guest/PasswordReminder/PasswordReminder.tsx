import { useState } from 'react'
import { Recovered } from './Recovered'
import { RecoveryByEmail } from './RecoveryByEmail'
import { OTPInput } from './OTPInput/OTPInput'
import styles from './PasswordReminder.module.scss'
import { ChangePassword } from './ChangePassword'

export const PasswordReminder = () => {
  const [page, setPage] = useState('login')
  const [currentUserID, setCurrentUserID] = useState<number | null>(null)

  const updateCurrentUserID = (id: number) => {
    setCurrentUserID(id)
  }

  const pageType: Record<string, JSX.Element> = {
    login: <RecoveryByEmail setPage={setPage} updateID={updateCurrentUserID} />,
    otp: <OTPInput setPage={setPage} currentUserID={currentUserID} />,
    reset: <ChangePassword setPage={setPage} currentUserID={currentUserID} />,
  }

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.formWrapper}>
        {pageType[page] ?? <Recovered />}
      </div>
    </div>
  )
}
