import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Result, Spin, Collapse, Pagination, Divider, App } from 'antd'
import styles from '../OfficialApplication.module.scss'
import {
  type OfficialApplicationDeleteAddressProps,
  type DeleteAddressInfoVerificationValues,
  type AddressToDelete,
} from '../officialApplicationsInterfaces'
import { graphql } from '@/gql'
import { useAuth } from '@/auth/authProvider'
import { ConfirmModal } from '@/components/domains/common/ConfirmModal'
import { generateDateLabel } from '@/utils/applicationUtils'
import { ActionType } from '@/types/ActionType'
import { logout } from '@/auth/authClient'

const { Panel } = Collapse

interface GenerateAddressTypeLabel {
  1: string
  2: string
  3: string
}

const officialApplicationDeleteAddressInfoVerify = graphql(`
  mutation OfficialAddressInfoApplicationsVerifyDelete(
    $props: OfficialDeleteAddressInfoApplicationsVerifyMutationProps!
  ) {
    official {
      applications {
        addressInfo {
          verifyDelete(props: $props) {
            status {
              message
            }
          }
        }
      }
    }
  }
`)

export const OfficialApplicationDeleteAddress: React.FC<
  OfficialApplicationDeleteAddressProps
> = ({ data, loading, refetch }) => {
  const [verify] = useMutation(officialApplicationDeleteAddressInfoVerify)
  const { user } = useAuth()

  const [addressesToDeleteList, setAddressesToDeleteList] = useState<
    AddressToDelete[]
  >([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const pageSize = 10
  const { message } = App.useApp()

  useEffect(() => {
    const response = data?.official?.applications?.addressInfo?.get
    if (response) {
      // wyświetl tylko wnioski o usunięcie adresu
      setAddressesToDeleteList(
        response.filter(
          (a) => a.addressApplications_typeID === ActionType.REMOVE_ADRESS
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
    userAddress_ID,
  }: DeleteAddressInfoVerificationValues) => {
    if (user?.basicInfo?.users_ID) {
      await verify({
        variables: {
          props: {
            isVerified,
            reviewer: user?.basicInfo.users_ID,
            addressApplications_ID,
            userAddress_ID,
          },
        },
      })
    } else {
      await message.error('Wystąpił błąd')
    }

    await refetch()
  }

  const generateAddressTypeLabel = {
    1: 'korespondencyjny',
    2: 'zamieszkania',
    3: 'zameldowania',
  }

  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedAddresses = addressesToDeleteList.slice(startIndex, endIndex)

  let foundAddresses
  if (loading) {
    foundAddresses = (
      <div className={styles.spin}>
        <Spin size="large" />
      </div>
    )
  } else if (paginatedAddresses.length > 0) {
    foundAddresses = (
      <Collapse ghost>
        {paginatedAddresses.map((a) => (
          <Panel
            className={styles.cardPanel}
            header={
              <div className={styles.cardHeader}>
                <div className={styles.baseCardInfo}>
                  Usunięcie adresu{' '}
                  {
                    generateAddressTypeLabel[
                      a.addressApplications_addressTypeID as keyof GenerateAddressTypeLabel
                    ]
                  }{' '}
                  użytkownika {a.user.users_name}
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
              <div className={styles.panelHeader}>Sczegóły adresu</div>
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
              {a.addressApplications_addressID && (
                <div className={styles.applicationActions}>
                  <ConfirmModal
                    popupTitle={`Czy na pewno chcesz zatwierdzić usunięcie adresu?`}
                    buttonContent="Zatwierdź"
                    confirmFunction={async () => {
                      await handleVerify({
                        isVerified: true,
                        addressApplications_ID: a.addressApplications_ID,
                        userAddress_ID: a.addressApplications_addressID!,
                      })
                    }}
                    buttonType="primary"
                  />
                  <ConfirmModal
                    popupTitle={`Czy na pewno chcesz odrzucić usunięcie adresu?`}
                    buttonContent="Odrzuć"
                    confirmFunction={async () => {
                      await handleVerify({
                        isVerified: false,
                        addressApplications_ID: a.addressApplications_ID,
                        userAddress_ID: a.addressApplications_addressID!,
                      })
                    }}
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
      <Result
        status="success"
        title="Brak wniosków dotyczących usunięcia adresu"
      />
    )
  }

  const totalPages = Math.ceil(addressesToDeleteList.length / pageSize)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <>
      {addressesToDeleteList.length > 0 && (
        <Divider plain className={styles.divider}>
          Liczba oczekujących wniosków: {addressesToDeleteList.length}
        </Divider>
      )}
      {foundAddresses}
      {addressesToDeleteList.length > 0 && (
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
