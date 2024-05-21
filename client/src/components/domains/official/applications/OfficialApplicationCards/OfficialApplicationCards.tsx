import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import {
  Button,
  Result,
  Spin,
  Collapse,
  Pagination,
  Modal,
  Divider,
  App,
} from 'antd'
import { Form } from 'react-final-form'
import classNames from 'classnames'
import styles from '../OfficialApplication.module.scss'
import {
  type NewCardVerificationValues,
  type ApplicationUpdateProps,
  type NewCardType,
  type OfficialApplicationCardsProps,
  type OfficialApplicationUpdateCardValues,
} from '../officialApplicationsInterfaces'
import { graphql } from '@/gql'
import { useAuth } from '@/auth/authProvider'
import { Input } from '@/components/domains/common/Input'
import { ConfirmModal } from '@/components/domains/common/ConfirmModal'
import { generateDateLabel } from '@/utils/applicationUtils'
import { logout } from '@/auth/authClient'
import { validationMessages } from '@/utils/validationMessages'

const { Panel } = Collapse

const officialApplicationCardsVerify = graphql(`
  mutation OfficialCardsApplicationsVerify(
    $props: OfficialCardsApplicationsVerifyMutationProps!
  ) {
    official {
      applications {
        cards {
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

export const ApplicationUpdate: React.FC<ApplicationUpdateProps> = ({
  open,
  setOpen,
  verify,
  refetch,
  reviewer,
  actualApplicationID,
  actualApplicationUserID,
}) => {
  const { message } = App.useApp()

  const onSubmit = async (values: OfficialApplicationUpdateCardValues) => {
    if (reviewer.basicInfo?.users_ID) {
      verify({
        variables: {
          props: {
            isVerified: true,
            reviewer: reviewer.basicInfo.users_ID,
            cardsApplications_ID: actualApplicationID,
            user_ID: actualApplicationUserID,
            card_number: values.cardsApplications_number,
          },
        },
      })
    } else {
      await message.error('Wystąpił błąd')
    }

    await refetch()
    setOpen(false)
  }

  const validateAddNewCard = (values) => {
    return {
      cardsApplications_number: values.cardsApplications_number
        ? undefined
        : validationMessages.required,
    }
  }

  return (
    <Modal
      title="Dodawanie nowej karty dostępu"
      footer={
        <>
          <Button
            onClick={() => {
              setOpen(false)
            }}
          >
            Anuluj
          </Button>
          <Button form="applicationUpdate" htmlType="submit" type="primary">
            Dodaj kartę
          </Button>
        </>
      }
      open={open}
      onCancel={() => {
        setOpen(false)
      }}
    >
      <Form onSubmit={onSubmit} validate={validateAddNewCard}>
        {({ handleSubmit }) => (
          <form id="applicationUpdate" onSubmit={handleSubmit}>
            <Input
              name="cardsApplications_number"
              placeholder="Numer karty dostępu"
              type="text"
            />
          </form>
        )}
      </Form>
    </Modal>
  )
}

export const OfficialApplicationCards: React.FC<
  OfficialApplicationCardsProps
> = ({ data, loading, refetch }) => {
  const [verify, { loading: verificationLoading }] = useMutation(
    officialApplicationCardsVerify
  )
  const [actualApplicationID, setActualApplicationID] = useState<
    number | undefined
  >(undefined)
  const [actualApplicationUserID, setActualApplicationUserID] = useState<
    number | undefined
  >(undefined)
  const { user } = useAuth()
  const [cardsList, setCardsList] = useState<NewCardType[]>([])
  const [positiveVerificationModalOpen, setPositiveVerificationModalOpen] =
    useState(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const pageSize = 10
  const { message } = App.useApp()

  useEffect(() => {
    const response = data?.official?.applications?.cards?.get
    if (response) {
      setCardsList(response)
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
    card_number,
    cardsApplications_ID,
  }: NewCardVerificationValues) => {
    if (user?.basicInfo?.users_ID) {
      await verify({
        variables: {
          props: {
            isVerified,
            card_number,
            reviewer: user?.basicInfo?.users_ID,
            cardsApplications_ID,
            user_ID: actualApplicationUserID,
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
  const paginatedCards = cardsList.slice(startIndex, endIndex)

  let foundCards
  if (loading || verificationLoading) {
    foundCards = (
      <div className={styles.spin}>
        <Spin size="large" />
      </div>
    )
  } else if (paginatedCards.length > 0) {
    foundCards = (
      <Collapse ghost>
        {paginatedCards?.map((c) => (
          <Panel
            className={styles.cardPanel}
            key={c.cardsApplications_ID}
            header={
              <div className={styles.cardHeader}>
                <div className={styles.baseCardInfo}>
                  Nowa karta dla użytkownika {c.user ? c.user.users_name : ''}
                </div>
                <div className={styles.dateAdded}>
                  <span>Data złożenia:</span>
                  <span>
                    {generateDateLabel(c.cardsApplications_dateAdded)}
                  </span>
                </div>
              </div>
            }
          >
            <div className={styles.panelContentWrapper}>
              <div className={classNames(styles.panelHeader)}>
                Wnioski o przypisanie altan śmietnikowych do nowej karty
              </div>

              {c.dumpsters
                ?.filter((d) => d !== null)
                // eslint-disable-next-line array-callback-return
                .map((d) => {
                  if (d)
                    return (
                      <div key={d.dumpster_ID} className={styles.panelDetails}>
                        <span>{d?.dumpster_name}</span>
                      </div>
                    )
                })}

              <div className={styles.applicationActions}>
                <ConfirmModal
                  popupTitle={`Czy na pewno chcesz zatwierdzić dodanie karty?`}
                  buttonContent="Zatwierdź"
                  confirmFunction={() => {
                    setPositiveVerificationModalOpen(true)
                    setActualApplicationID(c.cardsApplications_ID)
                    setActualApplicationUserID(c.user?.users_ID)
                  }}
                  buttonType="primary"
                />
                <ConfirmModal
                  popupTitle={`Czy na pewno chcesz odrzucić dodanie karty użytkownikowi?`}
                  buttonContent="Odrzuć"
                  confirmFunction={async () =>
                    handleVerify({
                      isVerified: false,
                      cardsApplications_ID: c.cardsApplications_ID,
                    })
                  }
                  buttonType="default"
                />
              </div>
            </div>
          </Panel>
        ))}
      </Collapse>
    )
  } else {
    foundCards = (
      <Result status="success" title="Brak wniosków dotyczących nowych kart" />
    )
  }

  const totalPages = Math.ceil(cardsList.length / pageSize)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <>
      {user ? (
        <>
          {cardsList.length > 0 && (
            <Divider plain className={styles.divider}>
              Liczba oczekujących wniosków: {cardsList.length}
            </Divider>
          )}
          {foundCards}
          {positiveVerificationModalOpen &&
          actualApplicationID &&
          actualApplicationUserID ? (
            <ApplicationUpdate
              open={positiveVerificationModalOpen}
              setOpen={setPositiveVerificationModalOpen}
              verify={verify}
              refetch={refetch}
              reviewer={user}
              actualApplicationID={actualApplicationID}
              actualApplicationUserID={actualApplicationUserID}
            />
          ) : null}
          {cardsList.length > 0 && (
            <Pagination
              className={styles.pagination}
              current={currentPage}
              total={totalPages * pageSize}
              pageSize={pageSize}
              onChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <div>Nie znaleziono użytkownika</div>
      )}
    </>
  )
}
