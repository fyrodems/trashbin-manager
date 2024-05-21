import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Collapse, Divider, Pagination, Result, Spin, App } from 'antd'
import styles from '../OfficialApplication.module.scss'
import {
  type OfficialApplicationEditPersonalDataProps,
  type EditUserInfoVerificationValues,
  type OfficialPersonalDataApplication,
} from '../officialApplicationsInterfaces'
import { graphql } from '@/gql'
import { useAuth } from '@/auth/authProvider'
import { ConfirmModal } from '@/components/domains/common/ConfirmModal'
import { generateDateLabel } from '@/utils/applicationUtils'
import { logout } from '@/auth/authClient'
import { ActionType } from '@/types/ActionType'

const { Panel } = Collapse

const officialApplicationPersonalDataInfoVerifyEdit = graphql(`
  mutation OfficialUserInfoApplicationsVerifyEdit(
    $props: OfficialEditUserInfoApplicationsVerifyMutationProps!
  ) {
    official {
      applications {
        userInfo {
          verifyEdit(props: $props) {
            status {
              message
            }
          }
        }
      }
    }
  }
`)

export const OfficialApplicationEditPersonalData: React.FC<
  OfficialApplicationEditPersonalDataProps
> = ({ data, refetch }) => {
  const [verify, { loading }] = useMutation(
    officialApplicationPersonalDataInfoVerifyEdit
  )
  const { user } = useAuth()

  const [editPersonalDataList, setEditPersonalDataList] = useState<
    OfficialPersonalDataApplication[]
  >([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const pageSize = 10
  const { message } = App.useApp()

  useEffect(() => {
    const response = data?.official?.applications?.userInfo?.get
    if (response) {
      // wyświetl tylko wnioski o dodanie adresu
      setEditPersonalDataList(
        response.filter(
          (a) =>
            a.personalDataApplications_typeID === ActionType.EDIT_PERSONAL_DATA
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
    personalDataApplications_ID,
    user_ID,
  }: EditUserInfoVerificationValues) => {
    if (user?.basicInfo?.users_ID) {
      await verify({
        variables: {
          props: {
            isVerified,
            reviewer: user?.basicInfo.users_ID,
            personalDataApplications_ID,
            user_ID,
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
  const paginatedPersonalData = editPersonalDataList.slice(startIndex, endIndex)

  let foundPersonalData
  if (paginatedPersonalData.length > 0) {
    foundPersonalData = (
      <Collapse ghost>
        {paginatedPersonalData.map((p) => (
          <Panel
            className={styles.cardPanel}
            header={
              <div className={styles.cardHeader}>
                <div className={styles.baseCardInfo}>
                  Wniosek o zmianę danych osobowych na:{' '}
                  {p.personalDataApplications_name}
                </div>
                <div className={styles.dateAdded}>
                  <span>Data złożenia:</span>
                  <span>
                    {generateDateLabel(p.personalDataApplications_dateAdded)}
                  </span>
                </div>
              </div>
            }
            key={p.personalDataApplications_ID}
          >
            <div className={styles.panelContentWrapper}>
              <div className={styles.panelHeader}>Szczegóły wniosku</div>

              <div className={styles.panelDetails}>
                <span>Aktualne dane</span>
                <span>{p.personalDataApplications_oldName}</span>
              </div>

              <div className={styles.panelDetails}>
                <span>Nowe dane</span>
                <span>{p.personalDataApplications_name}</span>
              </div>
              {user?.basicInfo?.users_ID && (
                <div className={styles.applicationActions}>
                  <ConfirmModal
                    popupTitle={`Czy na pewno chcesz zatwierdzić zmianę danych personalnych użytkownika?`}
                    buttonContent="Zatwierdź"
                    confirmFunction={async () =>
                      handleVerify({
                        isVerified: true,
                        personalDataApplications_ID:
                          p.personalDataApplications_ID,
                        user_ID: p.personalDataApplications_userID,
                        reviewer: user.basicInfo!.users_ID,
                      })
                    }
                    buttonType="primary"
                  />
                  <ConfirmModal
                    popupTitle={`Czy na pewno chcesz odrzucić zmianę danych personalnych użytkownika?`}
                    buttonContent="Odrzuć"
                    confirmFunction={async () =>
                      handleVerify({
                        isVerified: false,
                        personalDataApplications_ID:
                          p.personalDataApplications_ID,
                        user_ID: p.personalDataApplications_userID,
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
    foundPersonalData = (
      <Result
        status="success"
        title="Brak wniosków dotyczących edycji danych osobowych"
      />
    )
  }

  const totalPages = Math.ceil(editPersonalDataList.length / pageSize)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <>
      {editPersonalDataList.length > 0 && (
        <Divider plain className={styles.divider}>
          Liczba oczekujących wniosków: {editPersonalDataList.length}
        </Divider>
      )}
      {loading ? (
        <div className={styles.spin}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          {foundPersonalData}
          {editPersonalDataList.length > 0 && (
            <Pagination
              className={styles.pagination}
              current={currentPage}
              total={totalPages * pageSize}
              pageSize={pageSize}
              onChange={handlePageChange}
            />
          )}
        </>
      )}
    </>
  )
}
