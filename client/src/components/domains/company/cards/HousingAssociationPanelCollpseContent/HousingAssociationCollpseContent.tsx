import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { HousingAssociationDeleteOccupantAccess } from '../HousingAssociationDeleteOccupantAccess/HousingAssociationDeleteOccupantAccess'
import { HousingAssociationAddOccupantAccess } from '../HousingAssociationAddOccupantAccess/HousingAssociationAddOccupantAccess'
import { type HousingAssociationOperationsProps } from '../interfaces'
import { graphql } from '@/gql'

const findUser = graphql(`
  query CommonUserGet($props: CommonUserDataGetQueryProps!) {
    common {
      user {
        get(props: $props) {
          basicInfo {
            users_ID
            users_login
            users_name
            users_identificationNumber
            users_phoneNumber
            users_statusID
          }
        }
      }
    }
  }
`)

export const HousingAssociationCollpseContent: React.FC<
  HousingAssociationOperationsProps
> = ({ cardID, userID, refetchUserData }) => {
  const [userName, setUserName] = useState<string | null>(null)

  const queryData = useQuery(findUser, {
    variables: {
      props: {
        users_ID: userID,
      },
    },
  })

  useEffect(() => {
    const userName = queryData?.data?.common?.user?.get?.basicInfo?.users_name
    if (userName) {
      setUserName(userName)
    }
  })

  return (
    <>
      <span>
        {userID === null
          ? 'Karta dostępu nie została przypisana do użytkownika'
          : `Karta dostępu przypisana do użytkownika ${userName ?? ''}`}
      </span>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <HousingAssociationDeleteOccupantAccess
          cardID={cardID}
          userID={userID}
          refetchUserData={refetchUserData}
        />
        <HousingAssociationAddOccupantAccess
          cardID={cardID}
          userID={userID}
          refetchUserData={refetchUserData}
        />
      </div>
    </>
  )
}
