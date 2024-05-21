import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Collapse, Divider, Pagination, Result, Spin, App } from 'antd'
import styles from '../OfficialApplication.module.scss'
import {
  type AddressApplication,
  type EditAddressInfoVerificationValues,
  type OfficialApplicationEditAddressProps,
  type OfficialEditAddressInfoApplicationsVerifyMutationProps,
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

const officialApplicationAddressInfoVerifyEdit = graphql(`
  mutation OfficialAddressInfoApplicationsVerifyEdit(
    $props: OfficialEditAddressInfoApplicationsVerifyMutationProps!
  ) {
    official {
      applications {
        addressInfo {
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

export const OfficialApplicationEditAddress: React.FC<
  OfficialApplicationEditAddressProps
> = ({ data, refetch }) => {
  const { message } = App.useApp()
  const { user } = useAuth()
  const [verify, { loading }] = useMutation<
    {
      official: {
        applications: {
          addressInfo: { verifyEdit: { status: { message: string } } }
        }
      }
    },
    { props: OfficialEditAddressInfoApplicationsVerifyMutationProps }
  >(officialApplicationAddressInfoVerifyEdit)

  const [currentPage, setCurrentPage] = useState<number>(1)
  const pageSize = 10

  const [editAddressesList, setEditAddressesList] = useState<
    AddressApplication[]
  >([])

  useEffect(() => {
    const response = data?.official?.applications?.addressInfo?.get
    if (response) {
      setEditAddressesList(
        response.filter(
          (a) => a.addressApplications_typeID === ActionType.EDIT_ADRESS
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
  }: EditAddressInfoVerificationValues) => {
    if (user?.basicInfo?.users_ID) {
      await verify({
        variables: {
          props: {
            isVerified,
            reviewer: user.basicInfo.users_ID,
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
  const paginatedAddresses = editAddressesList.slice(startIndex, endIndex)

  const foundAddresses =
    paginatedAddresses.length > 0 ? (
      <Collapse ghost>
        {paginatedAddresses.map((a) => (
          <Panel
            className={styles.cardPanel}
            header={
              <div className={styles.cardHeader}>
                <div className={styles.baseCardInfo}>
                  Adres{' '}
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
                    popupTitle={`Czy na pewno chcesz zatwierdzić zmianę danych adresowych użytkownika?`}
                    buttonContent="Zatwierdź"
                    confirmFunction={async () =>
                      handleVerify({
                        isVerified: true,
                        addressApplications_ID: a.addressApplications_ID,
                        user_ID: a.user?.users_ID,
                        userAddress_ID: a.addressApplications_addressID,
                        reviewer: user.basicInfo!.users_ID,
                      })
                    }
                    buttonType="primary"
                  />
                  <ConfirmModal
                    popupTitle={`Czy na pewno chcesz odrzucić zmianę danych adresowych użytkownika?`}
                    buttonContent="Odrzuć"
                    confirmFunction={async () =>
                      handleVerify({
                        isVerified: false,
                        addressApplications_ID: a.addressApplications_ID,
                        user_ID: a.user?.users_ID,
                        userAddress_ID: a.addressApplications_addressID,
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
    ) : (
      <Result status="success" title="Brak wniosków o edycję adresów" />
    )

  const totalPages = Math.ceil(editAddressesList.length / pageSize)

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
          {editAddressesList.length > 0 && (
            <Divider plain className={styles.divider}>
              Liczba oczekujących wniosków: {editAddressesList.length}
            </Divider>
          )}
          {foundAddresses}
          {editAddressesList.length > 0 && (
            <Pagination
              className={styles.pagination}
              current={currentPage}
              total={totalPages}
              pageSize={pageSize}
              onChange={handlePageChange}
            />
          )}
        </>
      )}
    </>
  )
}
