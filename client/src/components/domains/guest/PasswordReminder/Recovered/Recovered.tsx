import { Button } from 'antd'
import { Link } from 'react-router-dom'
import styles from '../PasswordReminder.module.scss'

export const Recovered = () => {
  return (
    <div>
      <div>Zmieniono hasło</div>
      <Button type="primary" className={styles.loginButton}>
        <Link to="/login">
          <p>Ok</p>
        </Link>
      </Button>
    </div>
  )
}
