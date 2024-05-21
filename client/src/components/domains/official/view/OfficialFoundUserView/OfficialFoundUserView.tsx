import { Button, Divider, Result, Spin, Card } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { OfficialUserDetails } from '../../foundUser/OfficialUserDetails/OfficialUserDetails'
import { OfficialPanelEditUserCards } from '../../foundUser/cards/OfficialPanelEditUserCards/OfficialPanelEditUserCards'
import { OfficialPanelUserContracts } from '../../foundUser/contracts/OfficialPanelUserContracts/OfficialPanelUserContracts'
import styles from './OfficialFoundUserView.module.scss'
import { type OfficialSelectedUserDataType } from './interfaces'
import { graphql } from '@/gql'
import { OfficialActivateUser } from '@/components/domains/official/foundUser/OfficialActivateUser/OfficialActivateUser'
import { OfficialPanelAddress } from '@/components/domains/official/foundUser/addresess/OfficialPanelAddress/OfficialPanelAddress'
// import { OfficialEditContractForm } from '@/components/domains/official/OfficialEditContractForm/OfficialEditContractForm'

const officialFindSelectedUserDataQuery = graphql(`
  query OfficialUserGet($props: OfficialSelectedUserDataGetQueryProps!) {
    official {
      user {
        get {
          result(props: $props) {
            userType
            basicInfo {
              users_name
              users_identificationNumber
              users_login
              users_phoneNumber
              users_ID
              users_statusID
            }
            cards {
              usersCards_statusID
              usersCards_ID
              usersCards_number
              usersCards_numberPIN
              dumpsters {
                dumpster_name
                dumpster_city
                dumpster_street
                dumpster_houseNumbers
                dumpster_ID
              }
            }
            addressInfo {
              usersAddress_typeID
              usersAddress_ID
              usersAddress_street
              usersAddress_houseNumber
              usersAddress_apartamentNumber
              usersAddress_postCode
              usersAddress_city
              usersAddress_communityID
            }
            contracts {
              userContracts {
                usersContract_ID
                usersContract_userID
                usersContract_number
                usersContract_dateFrom
                usersContract_dateTo
                usersContract_statusID
                usersContract_communityID
                rates {
                  paper
                  plastic
                  glass
                  bio
                  mixed
                }
              }
              housingAssociationContracts {
                dumpsterContract_ID
                dumpsterContract_number
                dumpsterContract_dumpsterID
                dumpsterContract_dateFrom
                dumpsterContract_dateTo
                dumpsterContract_statusID
                dumpsterContract_communityID
                rates {
                  paper
                  plastic
                  glass
                  bio
                  mixed
                }
              }
            }
          }
        }
      }
    }
  }
`)

export const OfficialFoundUserView: React.FC = () => {
  const [userData, setUserData] = useState<OfficialSelectedUserDataType | null>(
    null
  )
  const { id } = useParams()
  const queryData = useQuery(officialFindSelectedUserDataQuery, {
    variables: {
      props: {
        users_ID: Number(id),
      },
    },
  })
  const { refetch } = queryData

  useEffect(() => {
    const response = queryData.data?.official?.user?.get?.result
    if (response) {
      setUserData(response)
    }
  })

  return (
    <>
      {queryData.loading ? (
        <div style={{ height: '80vh', display: 'grid', placeItems: 'center' }}>
          <Spin size="large" />
        </div>
      ) : (
        !userData && (
          <Result
            status="warning"
            title="Nie znaleziono takiego użytkownika"
            extra={
              <Button type="default">
                <Link to="/home">Powrót do strony głównej</Link>
              </Button>
            }
          />
        )
      )}

      {userData ? (
        <>
          <Divider>Dane użytkownika</Divider>
          <Card
            hoverable={false}
            style={{ width: '100%', marginBottom: '3rem' }}
          >
            <OfficialUserDetails userInfoData={userData} refetch={refetch} />
            <Divider />
            <OfficialPanelAddress userInfoData={userData} refetch={refetch} />
          </Card>
          <OfficialPanelEditUserCards
            userInfoData={userData}
            refetch={refetch}
          />
          {/*         <OfficialPanelUserContracts
            userContractsData={userData.contracts?.userContracts?.filter(
              (c) => c !== undefined
            )}
            refetch={refetch}
            userData={userData}
          /> */}
          <div className={styles.statusActions}>
            <OfficialActivateUser userInfoData={userData} refetch={refetch} />
          </div>
        </>
      ) : null}
    </>
  )
}
