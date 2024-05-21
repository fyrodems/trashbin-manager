import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Spin } from 'antd'
import { UserPanelCards } from '../../cards/UserPanelCards/UserPanelCards'
import styles from './UserCardsView.module.scss'
import { type UserCardsViewUserData } from './interfaces'
import { graphql } from '@/gql'

const userDataQuery = graphql(`
  query CurrentUser1 {
    user {
      info {
        get {
          userType
          basicInfo {
            users_ID
          }
          cards {
            usersCards_ID
            usersCards_statusID
            usersCards_number
            usersCards_rentedToUserID
            dumpsters {
              dumpster_ID
              dumpster_name
              dumpster_city
              dumpster_street
              dumpster_houseNumbers
            }
          }
        }
      }
    }
  }
`)

export const UserCardsView: React.FC = () => {
  const { data, refetch, loading } = useQuery(userDataQuery)
  const [userData, setUserData] = useState<UserCardsViewUserData>(null)

  useEffect(() => {
    const userData = data?.user?.info?.get
    if (userData) {
      setUserData(userData)
    }
  }, [data])

  return (
    <>
      {loading ? (
        <div style={{ height: '80vh', display: 'grid', placeItems: 'center' }}>
          <Spin size="large" />
        </div>
      ) : (
        <div className={styles.section}>
          <UserPanelCards userData={userData} refetch={refetch} />
        </div>
      )}
    </>
  )
}
