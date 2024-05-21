import { Descriptions } from 'antd'
import { OfficialDeleteUser } from '../OfficialDeleteUserForm/OfficialDeleteUserForm'
import { type OfficialUserDetailsProps } from '../officialFoundUserInterfaces'
import styles from './OfficialUserDetails.module.scss'

const { Item } = Descriptions

export const OfficialUserDetails: React.FC<OfficialUserDetailsProps> = ({
  userInfoData,
  refetch,
}) => {
  return (
    <div className={styles.userDetailsWrapper}>
      <Descriptions
        labelStyle={{ width: window.innerWidth < 576 ? '100px' : '170px' }}
        column={2}
        className={styles.firstDescription}
      >
        <Item>
          <div>
            <p className={styles.dataLabel}>Imię i nazwisko</p>
            <p className={styles.dataText}>
              {userInfoData.basicInfo.users_name}
            </p>
          </div>
        </Item>
        <Item>
          <div>
            <p className={styles.dataLabel}>PESEL</p>
            <p className={styles.dataText}>
              {userInfoData.basicInfo.users_identificationNumber}
            </p>
          </div>
        </Item>
        <Item>
          <div>
            <p className={styles.dataLabel}>Email</p>
            <p className={styles.dataText}>
              {userInfoData.basicInfo.users_login}
            </p>
          </div>
        </Item>
        <Item>
          <div>
            <p className={styles.dataLabel}>Numer telefonu</p>
            <p className={styles.dataText}>
              {userInfoData.basicInfo.users_phoneNumber}
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
          <OfficialDeleteUser
            refetch={refetch}
            user_ID={userInfoData.basicInfo.users_ID}
            users_name={userInfoData?.basicInfo?.users_name}
            users_statusID={userInfoData?.basicInfo?.users_statusID}
          />
        </Item>
      </Descriptions>
    </div>
  )
}
