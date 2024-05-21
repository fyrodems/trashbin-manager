import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Result, Spin, Collapse, Pagination, Divider, App } from 'antd'
import classNames from 'classnames'
import styles from '../OfficialApplication.module.scss'
import {
  type OfficialApplicationAddDumpsterProps,
  type NewDumpsterVerificationValues,
  type DumpsterData,
} from '../officialApplicationsInterfaces'
import { graphql } from '@/gql'
import { useAuth } from '@/auth/authProvider'
import { ConfirmModal } from '@/components/domains/common/ConfirmModal'
import { generateDateLabel } from '@/utils/applicationUtils'
import { ActionType } from '@/types/ActionType'
import { logout } from '@/auth/authClient'

const { Panel } = Collapse

const officialApplicationDumpsterVerify = graphql(`
  mutation OfficialDumpstersApplicationsVerifyAdd(
    $props: OfficialAddDumpstersApplicationsVerifyMutationProps!
  ) {
    official {
      applications {
        dumpsters {
          verifyAdd(props: $props) {
            status {
              message
            }
          }
        }
      }
    }
  }
`)

export const OfficialApplicationDumpsterAdd: React.FC<
  OfficialApplicationAddDumpsterProps
> = ({ data, refetch }) => {
  const [verify, { loading }] = useMutation(officialApplicationDumpsterVerify)
  const { user } = useAuth()

  const [newDumpstersList, setNewDumpstersList] = useState<DumpsterData[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const pageSize = 10
  const { message } = App.useApp()

  useEffect(() => {
    const response = data?.official?.applications?.dumpsters?.get
    if (response) {
      // wyświetl tylko wnioski o dodanie do karty
      setNewDumpstersList(
        response.filter(
          (a) =>
            a.dumpstersApplications_typeID ===
            ActionType.ADD_DUMPSTER_TO_THE_CARD
        )
      )
    }
  }, [data])
  ;(async () => {
    if (!user) {
      await message.error('Brak danych urzędnika')
      await logout()
    }
  })()

  const handleVerify = async ({
    isVerified,
    dumpstersApplications_ID,
    card_ID,
    dumpster_ID,
  }: NewDumpsterVerificationValues) => {
    if (user?.basicInfo?.users_ID) {
      await verify({
        variables: {
          props: {
            isVerified,
            dumpstersApplications_ID,
            reviewer: user?.basicInfo.users_ID,
            card_ID,
            dumpster_ID,
          },
        },
      })
    } else {
      await message.error('Wystąpił błąd')
    }

    await refetch()
  }

  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedDumpsters = newDumpstersList.slice(startIndex, endIndex)
  let foundDumpsters
  if (loading) {
    foundDumpsters = (
      <div className={styles.spin}>
        <Spin size="large" />
      </div>
    )
  } else if (paginatedDumpsters.length > 0) {
    foundDumpsters = (
      <Collapse ghost>
        {paginatedDumpsters.map((d) => (
          <Panel
            className={styles.cardPanel}
            key={d.dumpstersApplications_ID}
            header={
              <div className={styles.cardHeader}>
                <div className={styles.baseCardInfo}>
                  Dodanie altany śmietnikowej{' '}
                  {d.dumpstersApplications_dumpsterName} do karty
                </div>
                <div className={styles.dateAdded}>
                  <span>Data złożenia:</span>
                  <span>
                    {generateDateLabel(d.dumpstersApplications_dateAdded)}
                  </span>
                </div>
              </div>
            }
          >
            <div className={styles.panelContentWrapper}>
              <div className={classNames(styles.panelHeader)}>
                Szczegóły wniosku
              </div>

              <div className={styles.panelDetails}>
                <span>Imię i nazwisko wnioskującego</span>
                <span>{d.dumpstersApplications_userName}</span>
              </div>

              <div className={styles.panelDetails}>
                <span>Karta wnioskującego</span>
                <span>{d.dumpstersApplications_cardNumber}</span>
              </div>
              {user?.basicInfo?.users_ID && (
                <div className={styles.applicationActions}>
                  <ConfirmModal
                    popupTitle={`Czy na pewno chcesz zatwierdzić dodanie altany do karty?`}
                    buttonContent="Zatwierdź"
                    confirmFunction={async () =>
                      handleVerify({
                        isVerified: true,
                        dumpstersApplications_ID: d.dumpstersApplications_ID,
                        card_ID: d.dumpstersApplications_cardID,
                        dumpster_ID: d.dumpstersApplications_dumpsterID,
                        reviewer: user.basicInfo!.users_ID,
                      })
                    }
                    buttonType="primary"
                  />
                  <ConfirmModal
                    popupTitle={`Czy na pewno chcesz odrzucić dodanie altany do karty?`}
                    buttonContent="Odrzuć"
                    confirmFunction={async () =>
                      handleVerify({
                        isVerified: false,
                        dumpstersApplications_ID: d.dumpstersApplications_ID,
                        card_ID: d.dumpstersApplications_cardID,
                        dumpster_ID: d.dumpstersApplications_dumpsterID,
                        reviewer: user.basicInfo!.users_ID,
                      })
                    }
                    buttonType="default"
                  />
                </div>
              )}
            </div>
          </Panel>
        ))}
      </Collapse>
    )
  } else {
    foundDumpsters = (
      <Result
        status="success"
        title="Brak wniosków o dodanie altan śmietnikowych do kart dostępu"
      />
    )
  }

  const totalPages = Math.ceil(newDumpstersList.length / pageSize)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <>
      {newDumpstersList.length > 0 && (
        <Divider plain className={styles.divider}>
          Liczba oczekujących wniosków: {newDumpstersList.length}
        </Divider>
      )}
      {foundDumpsters}
      {newDumpstersList.length > 0 && (
        <Pagination
          className={styles.pagination}
          current={currentPage}
          total={totalPages * pageSize}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      )}
    </>
  )
}
