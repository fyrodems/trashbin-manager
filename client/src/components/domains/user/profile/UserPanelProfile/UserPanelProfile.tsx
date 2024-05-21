import { useState } from 'react'
import { Button, Card, Descriptions, Divider } from 'antd'
import { BaseDataUpdate } from '../BaseDataUpdate'
import { PasswordUpdate } from '../PasswordUpdate'
import { UserPanelAddresses } from '../addresses/UserPanelAddresses/UserPanelAddresses'
/* import { PINUpdate } from '../PINUpdate/PINUpdate' */
import styles from './UserPanelProfile.module.scss'
import { useAuth } from '@/auth/authProvider'

const { Item } = Descriptions

export const UserPanelProfile = () => {
  const { user, loading } = useAuth()
  const [baseDataModalOpen, setBaseDataModalOpen] = useState(false)
  const [passwordModalOpen, setPasswordModalOpen] = useState(false)
  /*   const [PINModalOpen, setPINModalOpen] = useState(false) */

  if (!user) {
    return <div>Brak autoryzacji</div>
  }

  if (loading) return <div>Wystąpił błąd</div>

  return (
    <div>
      <div className={styles.section}>
        <div className={styles.heading}>
          <Divider>Twoje dane</Divider>
          <Card
            hoverable={false}
            style={{ width: '100%', marginBottom: '3rem' }}
          >
            <div className={styles.userDetailsWrapper}>
              <Descriptions
                labelStyle={{
                  width: window.innerWidth < 576 ? '100px' : '170px',
                }}
                column={window.innerWidth < 576 ? 1 : 2}
                className={styles.firstDescription}
              >
                <Item>
                  <div>
                    <p className={styles.dataLabel}>Imię i nazwisko</p>
                    <p className={styles.dataText}>
                      {user.basicInfo?.users_name}
                    </p>
                  </div>
                </Item>
                <Item>
                  <div>
                    <p className={styles.dataLabel}>PESEL</p>
                    <p className={styles.dataText}>
                      {user.basicInfo?.users_identificationNumber}
                    </p>
                  </div>
                </Item>
                <Item>
                  <div>
                    <p className={styles.dataLabel}>Email</p>
                    <p className={styles.dataText}>
                      {user.basicInfo?.users_login}
                    </p>
                  </div>
                </Item>
                <Item>
                  <div>
                    <p className={styles.dataLabel}>Numer telefonu</p>
                    <p className={styles.dataText}>
                      {user.basicInfo?.users_phoneNumber}
                    </p>
                  </div>
                </Item>
              </Descriptions>
              <Descriptions
                labelStyle={{
                  width: window.innerWidth < 576 ? '100px' : '170px',
                }}
                column={1}
                className={styles.secondDescription}
              >
                <Item>
                  <Button
                    onClick={() => {
                      setBaseDataModalOpen(true)
                    }}
                  >
                    Zmień swoje dane
                  </Button>
                </Item>
                <Item>
                  <Button
                    type="default"
                    block
                    onClick={() => {
                      setPasswordModalOpen(true)
                    }}
                  >
                    Zmień hasło
                  </Button>
                </Item>
                {/*       <Item>
                  <Button
                    type="default"
                    block
                    onClick={() => {
                      setPINModalOpen(true)
                    }}
                  >
                    Zmień PIN
                  </Button>
                </Item> */}
              </Descriptions>
            </div>
            <Divider />
            <UserPanelAddresses usersData={user} />
          </Card>
        </div>
      </div>

      <BaseDataUpdate open={baseDataModalOpen} setOpen={setBaseDataModalOpen} />
      <PasswordUpdate open={passwordModalOpen} setOpen={setPasswordModalOpen} />
      {/*    <PINUpdate open={PINModalOpen} setOpen={setPINModalOpen} /> */}
    </div>
  )
}
