import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { CompanyOccupantsPanel } from '../../occupants/CompanyOccupantsPanel/CompanyOccupantsPanel'
import { graphql } from '@/gql'
import { type OfficialUserOccupantSearchType } from '@/gql/commonTypes'

const findOccupantsQuery = graphql(`
  query CompanyOccupantsGets {
    company {
      occupants {
        get {
          users_ID
          users_login
          users_name
          users_identificationNumber
          users_phoneNumber
          users_statusID
          connection_ID
          addresses {
            usersAddress_ID
            usersAddress_userID
            usersAddress_street
            usersAddress_houseNumber
            usersAddress_apartamentNumber
            usersAddress_postCode
            usersAddress_city
            usersAddress_typeID
            usersAddress_communityID
            usersAddress_statusID
          }
        }
      }
    }
  }
`)

export const CompanyOccupantsView = () => {
  const { data, refetch } = useQuery(findOccupantsQuery)
  const [occupants, setOccupants] = useState(
    [] as OfficialUserOccupantSearchType[]
  )

  useEffect(() => {
    if (data?.company?.occupants?.get) {
      setOccupants(data?.company?.occupants?.get)
    }
  }, [data])

  return <CompanyOccupantsPanel occupants={occupants} refetch={refetch} />
}
