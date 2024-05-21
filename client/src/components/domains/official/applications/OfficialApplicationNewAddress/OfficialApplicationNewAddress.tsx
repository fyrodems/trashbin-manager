import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Collapse, Divider, Pagination, Result, Spin, App } from 'antd'
import styles from '../OfficialApplication.module.scss'
import {
  type OfficialApplicationNewAddressProps,
  type NewAddressInfoVerificationValues,
  type OfficialNewAddressApplication,
} from '../officialApplicationsInterfaces'
import { graphql } from '@/gql'
import { useAuth } from '@/auth/authProvider'
import { ConfirmModal } from '@/components/domains/common/ConfirmModal'
import { generateDateLabel } from '@/utils/applicationUtils'
import { logout } from '@/auth/authClient'
import { ActionType } from '@/types/ActionType'

const { Panel } = Collapse

interface GenerateAddressTypeLabel {
  1: string
  2: string
  3: string
}

const officialApplicationAddressInfoVerify = graphql(`
  mutation OfficialAddressInfoApplicationsVerifyAdd(
    $props: OfficialAddAddressInfoApplicationsVerifyMutationProps!
  ) {
    official {
      applications {
        addressInfo {
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

export const OfficialApplicationNewAddress: React.FC<
  OfficialApplicationNewAddressProps
> = ({ data, refetch }) => {
  const [verify, { loading }] = useMutation(
    officialApplicationAddressInfoVerify
  )
  const { user } = useAuth()

  const [newAddressesList, setNewAddressesList] = useState<
    OfficialNewAddressApplication[]
  >([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const pageSize = 10
  const { message } = App.useApp()

  useEffect(() => {
    const response = data?.official?.applications?.addressInfo?.get
    if (response) {
      // wyświetl tylko wnioski o dodanie adresu
      setNewAddressesList(
        response.filter(
          (a) => a.addressApplications_typeID === ActionType.ADD_ADRESS
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
    addressApplications_ID,
    user_ID,
  }: NewAddressInfoVerificationValues) => {
    if (user?.basicInfo?.users_ID) {
      await verify({
        variables: {
          props: {
            isVerified,
            reviewer: user.basicInfo.users_ID,
            addressApplications_ID,
            user_ID,
          },
        },
      })
    } else {
      await message.error('Wystąpił błąd')
    }

    await refetch()
  }

  const generateAddressTypeLabel: GenerateAddressTypeLabel = {
    1: 'korespondencyjny',
    2: 'zamieszkania',
    3: 'zameldowania',
  }

  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedAddresses = newAddressesList.slice(startIndex, endIndex)

  let foundAddresses
  if (paginatedAddresses.length > 0) {
    foundAddresses = (
      <Collapse ghost>
        {paginatedAddresses.map((a) => (
          <Panel
            className={styles.cardPanel}
            header={
              <div className={styles.cardHeader}>
                <div className={styles.baseCardInfo}>
                  Dodanie adresu{' '}
                  {
                    generateAddressTypeLabel[
                      a.addressApplications_addressTypeID as keyof GenerateAddressTypeLabel
                    ]
                  }{' '}
                  użytkownikowi {a.user.users_name}
                </div>
                <div className={styles.dateAdded}>
                  <span>Data złożenia:</span>
                  <span>
                    {generateDateLabel(a.addressApplications_dateAdded)}
                  </span>
                </div>
              </div>
            }
            key={a.addressApplications_ID}
          >
            <div className={styles.panelContentWrapper}>
              <div className={styles.panelHeader}>Zadeklarowane dane</div>
              <div className={styles.panelDetails}>
                <span>Ulica</span>
                <span>{a.addressApplications_street}</span>
              </div>
              <div className={styles.panelDetails}>
                <span>Numer budynku</span>
                <span>{a.addressApplications_houseNumber}</span>
              </div>
              {a.addressApplications_apartamentNumber ? (
                <div className={styles.panelDetails}>
                  <span>Numer lokalu</span>
                  <span>{a.addressApplications_apartamentNumber}</span>
                </div>
              ) : null}

              <div className={styles.panelDetails}>
                <span>Kod pocztowy</span>
                <span>{a.addressApplications_postCode}</span>
              </div>
              <div className={styles.panelDetails}>
                <span>Miasto</span>
                <span>{a.addressApplications_city}</span>
              </div>
              {user?.basicInfo?.users_ID && (
                <div className={styles.applicationActions}>
                  <ConfirmModal
                    popupTitle={`Czy na pewno chcesz zatwierdzić dodanie adresu użytkownikowi?`}
                    buttonContent="Zatwierdź"
                    confirmFunction={async () =>
                      handleVerify({
                        isVerified: true,
                        addressApplications_ID: a.addressApplications_ID,
                        user_ID: a.user?.users_ID,
                        reviewer: user.basicInfo!.users_ID,
                      })
                    }
                    buttonType="primary"
                  />
                  <ConfirmModal
                    popupTitle={`Czy na pewno chcesz odrzucić dodanie adresu użytkownikowi?`}
                    buttonContent="Odrzuć"
                    confirmFunction={async () =>
                      handleVerify({
                        isVerified: false,
                        addressApplications_ID: a.addressApplications_ID,
                        user_ID: a.user?.users_ID,
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
    foundAddresses = (
      <Result status="success" title="Brak wniosków o dodanie nowego adresu" />
    )
  }

  const totalPages = Math.ceil(newAddressesList.length / pageSize)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <>
      {loading ? (
        <div className={styles.spin}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          {newAddressesList.length > 0 && (
            <Divider plain className={styles.divider}>
              Liczba oczekujących wniosków: {newAddressesList.length}
            </Divider>
          )}
          {foundAddresses}
          {newAddressesList.length > 0 && (
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
