import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { UserPersonalDataApplicationList } from '../UserPersonalDataApplictionList/UserPersonalDataApplictionList'
import { UserCardsApplictionList } from '../UserCardsApplictionList/UserCardsApplictionList'
import { UserDumpsterApplictionList } from '../UserDumpsterApplictionList/UserDumpsterApplictionList'
import { UserAddressApplictionList } from '../UserAddressApplictionList/UserAddressApplictionList'
import { type UserApplications } from '../applicationsInterfaces'
import { graphql } from '@/gql'

const findApplicationsQuery = graphql(`
  query UserApplicationsGet {
    user {
      applications {
        get {
          cards {
            cardsApplications_ID
            cardsApplications_userID
            cardsApplications_statusID
            cardsApplications_typeID
            cardsApplications_dateAdded
            cardsApplications_dateReviewed
          }
          dumpsters {
            dumpstersApplications_statusID
            dumpstersApplications_typeID
            dumpstersApplications_ID
            dumpstersApplications_dateAdded
            dumpstersApplications_cardID
            dumpstersApplications_dumpsterID
            dumpstersApplications_dateReviewed
            dumpstersApplications_ID
          }
          address {
            addressApplications_statusID
            addressApplications_ID
            addressApplications_typeID
            addressApplications_addressTypeID
            addressApplications_dateAdded
            addressApplications_street
            addressApplications_houseNumber
            addressApplications_apartamentNumber
            addressApplications_postCode
            addressApplications_city
            addressApplications_dateReviewed
          }
          personalData {
            personalDataApplications_statusID
            personalDataApplications_ID
            personalDataApplications_dateAdded
            personalDataApplications_name
            personalDataApplications_dateReviewed
          }
        }
      }
    }
  }
`)

export const UserPanelApplications: React.FC = () => {
  const { data } = useQuery(findApplicationsQuery)
  const [applications, setApplications] = useState<UserApplications | null>(
    null
  )
  useEffect(() => {
    if (data?.user?.applications?.get) {
      setApplications(data?.user?.applications?.get)
    }
  }, [data])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <UserDumpsterApplictionList applicationList={applications?.dumpsters} />
      <UserCardsApplictionList applicationList={applications?.cards} />
      <UserAddressApplictionList applicationList={applications?.address} />
      <UserPersonalDataApplicationList
        applicationList={applications?.personalData}
      />
    </div>
  )
}
