import { Descriptions } from 'antd'
import { CompanyProfileEdit } from '../CompanyProfileEdit/CompanyProfileEdit'
import styles from './CompanyProfileData.module.scss'
import { useAuth } from '@/auth/authProvider'
import { PasswordChange } from '@/components/domains/common/PasswordChange/PasswordChange'

const { Item } = Descriptions

export const CompanyProfileData = () => {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <div className={styles.userDetailsWrapper}>
      <Descriptions
        labelStyle={{ width: window.innerWidth < 576 ? '100px' : '170px' }}
        column={2}
        className={styles.firstDescription}
      >
        <Item>
          <div>
            <p className={styles.dataLabel}>Nazwa</p>
            <p className={styles.dataText}>{user.basicInfo?.users_name}</p>
          </div>
        </Item>
        <Item>
          <div>
            <p className={styles.dataLabel}>Numer identyfikacyjny</p>
            <p className={styles.dataText}>
              {user.basicInfo?.users_identificationNumber}
            </p>
          </div>
        </Item>
        <Item>
          <div>
            <p className={styles.dataLabel}>Email</p>
            <p className={styles.dataText}>{user.basicInfo?.users_login}</p>
          </div>
        </Item>
        <Item>
          <div>
            <p className={styles.dataLabel}>Numer kontaktowy</p>
            <p className={styles.dataText}>
              {user.basicInfo?.users_phoneNumber}
            </p>
          </div>
        </Item>
      </Descriptions>
      <Descriptions
        labelStyle={{ width: window.innerWidth < 576 ? '100px' : '170px' }}
        column={1}
        className={styles.secondDescription}
      >
        <Item>
          <PasswordChange />
        </Item>
        <Item>
          <CompanyProfileEdit />
        </Item>
      </Descriptions>
    </div>
  )
}
