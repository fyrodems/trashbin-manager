import { Modal, Typography, Result } from 'antd'
import { WarningTwoTone } from '@ant-design/icons'
import styles from './IdleLogoutModal.module.scss'
import { useAuth } from '@/auth/authProvider'

const { Text } = Typography

export const IdleLogoutModal = () => {
  const { idleLoggedOut, setIdleLoggedOut } = useAuth()

  return (
    <Modal
      open={idleLoggedOut}
      className={styles.modal}
      centered
      onCancel={() => {
        setIdleLoggedOut(false)
      }}
      footer={null}
    >
      <Result
        className={styles.result_modal}
        icon={<WarningTwoTone twoToneColor={'#ff8e00'} />}
        title="Wylogowano"
        subTitle={
          <div className={styles.modal_description}>
            <Text>Twoja sesja wygasła z powodu braku aktywności.</Text>
            <br />
            <Text>Zaloguj się ponownie.</Text>
          </div>
        }
      />
    </Modal>
  )
}
