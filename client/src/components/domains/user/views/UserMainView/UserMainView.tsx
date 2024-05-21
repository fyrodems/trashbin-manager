import { useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { Divider, Spin } from 'antd'
import { UserReportForLast30DaysGarbageLineChart } from '../../mainView/UserReportForLast30DaysGarbageLineChart/UserReportForLast30DaysGarbageLineChart'
import { UserCardsPreview } from '../../mainView/UserCardsPreview/UserCardsPreview'
import { UserContracts } from '../../contracts/UserContracts/UserContracts'
import styles from './UserMainView.module.scss'
import { graphql } from '@/gql'
import { DonutChart } from '@/components/domains/common/DonutChart'
import { useFetchGarbageData } from '@/components/domains/common/hooks/useFetchGarbageData'

const UserCardsInfoQuery = graphql(`
  query UserCardsInfo {
    user {
      card {
        cardsAndDumpsters {
          dumpsters {
            dumpster_city
            dumpster_houseNumbers
            dumpster_name
            dumpster_street
          }
          usersCards_ID
          usersCards_number
        }
      }
    }
  }
`)

const userContractsQuery = graphql(`
  query UserContractGet {
    user {
      contract {
        get {
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
`)

export const UserView: React.FC = () => {
  const datePeriod = useMemo(() => {
    const dateNow = new Date()
    const endDate = new Date(dateNow).toISOString().split('T')[0]
    const startDate = new Date(dateNow.setMonth(dateNow.getMonth() - 1))
      .toISOString()
      .split('T')[0]

    return { startDate, endDate }
  }, [])
  const { garbageData } = useFetchGarbageData({ date: datePeriod })

  const { data: userCardsInfo, loading: isLoadinguserCardsInfo } =
    useQuery(UserCardsInfoQuery)

  const { data: contractsData, loading: isLoadingUserContract } =
    useQuery(userContractsQuery)

  return (
    <>
      {isLoadinguserCardsInfo || isLoadingUserContract ? (
        <div style={{ height: '80vh', display: 'grid', placeItems: 'center' }}>
          <Spin size="large" />
        </div>
      ) : (
        <div className={styles.section}>
          <Divider>Ostatnie 30 dni</Divider>
          <div className={styles.chartWrapper}>
            {garbageData?.pieChart && (
              <DonutChart chartData={garbageData.pieChart} />
            )}
            {garbageData?.lineChart && (
              <UserReportForLast30DaysGarbageLineChart
                last30DaysGarbages={garbageData.lineChart}
              />
            )}
          </div>

          <Divider>Karty</Divider>
          {userCardsInfo?.user?.card?.cardsAndDumpsters && (
            <UserCardsPreview
              cards={userCardsInfo.user.card.cardsAndDumpsters}
            />
          )}

          <Divider>Umowy</Divider>
          {contractsData?.user?.contract?.get?.housingAssociationContracts ===
            null &&
          contractsData?.user?.contract?.get?.userContracts === null ? (
            <div>Brak kontraktów</div>
          ) : null}

          {contractsData?.user?.contract?.get?.housingAssociationContracts ===
            null && contractsData?.user?.contract?.get?.userContracts ? (
            <UserContracts
              userContractsData={{
                userContracts:
                  contractsData?.user?.contract?.get?.userContracts,
              }}
            />
          ) : null}

          {contractsData?.user?.contract?.get?.housingAssociationContracts &&
          contractsData?.user?.contract?.get?.userContracts === null ? (
            <UserContracts
              userContractsData={{
                housingAssociation:
                  contractsData?.user?.contract?.get
                    ?.housingAssociationContracts,
              }}
            />
          ) : null}

          <UserContracts
            userContractsData={{
              housingAssociation:
                contractsData?.user?.contract?.get?.housingAssociationContracts,
              userContracts: contractsData?.user?.contract?.get?.userContracts,
            }}
          />

          {/*  <Divider>Historia płatnicza</Divider>
          <div>Do implementacji</div> */}
        </div>
      )}
    </>
  )
}
