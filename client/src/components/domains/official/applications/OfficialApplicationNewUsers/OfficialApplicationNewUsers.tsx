import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Collapse, Pagination, Result, Spin, App, Divider } from 'antd'
import classNames from 'classnames'
import styles from '../OfficialApplication.module.scss'
import {
  type NewUserVerificationValues,
  type FoundUser,
  type OfficialApplicationNewUsersProps,
} from '../officialApplicationsInterfaces'
import { graphql } from '@/gql'
import { ConfirmModal } from '@/components/domains/common/ConfirmModal'

const { Panel } = Collapse

const officialApplicationNewUsersVerify = graphql(`
  mutation OfficialNewUserApplicationVerify(
    $props: OfficialNewUserApplicationVerifyMutationProps!
  ) {
    official {
      applications {
        newUser {
          verify(props: $props) {
            status {
              message
            }
          }
        }
      }
    }
  }
`)

export const OfficialApplicationNewUsers: React.FC<
  OfficialApplicationNewUsersProps
> = ({ data, loading, refetch }) => {
  const [verify] = useMutation(officialApplicationNewUsersVerify)
  const { message } = App.useApp()
  const [usersList, setUsersList] = useState<FoundUser[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const pageSize = 10

  useEffect(() => {
    const response = data?.official?.applications?.newUser?.get
    if (response) {
      setUsersList(response)
    }
  }, [data])

  const handleVerify = async ({
    isVerified,
    userID,
  }: NewUserVerificationValues) => {
    try {
      await verify({
        variables: {
          props: {
            isVerified,
            userID,
          },
        },
      })

      await refetch()
      await message.success('Operacja udana')
    } catch {
      await message.error('Coś poszło nie tak!')
    }
  }

  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedUsers = usersList.slice(startIndex, endIndex)

  const foundUsers =
    paginatedUsers.length > 0 ? (
      <Collapse ghost>
        {paginatedUsers.map((u) => (
          <Panel
            className={styles.cardPanel}
            header={
              <div className={classNames(styles.cardHeader)}>
                <div className={styles.baseCardInfo}>
                  <span>{u.users_name}</span>
                  <span>{u.users_login}</span>
                </div>
              </div>
            }
            key={u.users_ID}
          >
            <div className={styles.panelContentWrapper}>
              <div className={classNames(styles.panelHeader)}>
                Dane personalne
              </div>

              <div className={styles.panelDetails}>
                <span>Imię i nazwisko</span>
                <span>{u.users_name}</span>
              </div>

              <div className={styles.panelDetails}>
                <span>PESEL</span>
                <span>{u.users_identificationNumber}</span>
              </div>

              <div className={classNames(styles.panelHeader)}>
                Dane kontaktowe
              </div>
              <div className={styles.panelDetails}>
                <span>Adres e-mail</span>
                <span>{u.users_login}</span>
              </div>

              <div className={styles.panelDetails}>
                <span>Nr telefonu</span>
                <span>{u.users_phoneNumber}</span>
              </div>

              <div className={classNames(styles.panelHeader)}>
                Adres zameldowania
              </div>

              <div className={styles.panelDetails}>
                <span>Ulica</span>
                <span>{u.addresses[0].usersAddress_street}</span>
              </div>
              <div className={styles.panelDetails}>
                <span>Numer budynku</span>
                <span>{u.addresses[0].usersAddress_houseNumber}</span>
              </div>
              {u.addresses[0].usersAddress_apartamentNumber ? (
                <div className={styles.panelDetails}>
                  <span>Numer lokalu</span>
                  <span>{u.addresses[0].usersAddress_apartamentNumber}</span>
                </div>
              ) : null}

              <div className={styles.panelDetails}>
                <span>Kod pocztowy</span>
                <span>{u.addresses[0].usersAddress_postCode}</span>
              </div>
              <div className={styles.panelDetails}>
                <span>Miasto</span>
                <span>{u.addresses[0].usersAddress_city}</span>
              </div>

              <div className={styles.applicationActions}>
                <ConfirmModal
                  popupTitle={`Czy na pewno chcesz zatwierdzić użytkownika?`}
                  buttonContent="Zatwierdź"
                  confirmFunction={async () =>
                    handleVerify({ isVerified: true, userID: u.users_ID })
                  }
                  buttonType="primary"
                />
                <ConfirmModal
                  popupTitle={`Czy na pewno chcesz odrzucić użytkownika?`}
                  buttonContent="Odrzuć"
                  confirmFunction={async () =>
                    handleVerify({ isVerified: false, userID: u.users_ID })
                  }
                  buttonType="default"
                />
              </div>
            </div>
          </Panel>
        ))}
      </Collapse>
    ) : (
      <Result
        status="success"
        title="Brak wniosków o rejestrację nowych kont"
      />
    )

  const totalPages = Math.ceil(usersList.length / pageSize)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div>
      {loading ? (
        <div className={styles.spin}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          {usersList.length > 0 && (
            <Divider plain className={styles.divider}>
              Liczba oczekujących wniosków: {usersList.length}
            </Divider>
          )}
          {foundUsers}
          {usersList.length > 0 && (
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
    </div>
  )
}
