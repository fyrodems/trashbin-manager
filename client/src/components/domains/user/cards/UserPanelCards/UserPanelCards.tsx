import { Collapse, Pagination, Radio, type RadioChangeEvent } from 'antd'
import { useEffect, useState } from 'react'
import { UserDeleteCardForm } from '../UserDeleteCardForm/UserDeleteCardForm'
import { UserAddDumpsterForm } from '../UserAddDumpsterForm/UserAddDumpsterForm'
import { UserCreateCardForm } from '../UserCreateCardForm/UserCreateCardForm'
import { UserDeleteDumpsterForm } from '../UserDeleteDumpsterForm/UserDeleteDumpsterForm'
import { type OfficialUserInfoType } from '../userCardsInterfaces'
import styles from './UserPanelCards.module.scss'
import { useAuth } from '@/auth/authProvider'
import { UserType } from '@/types/UserType'
import { CardStatus } from '@/types/Status'
import { HousingAssociationCollpseContent } from '@/components/domains/company/cards/HousingAssociationPanelCollpseContent/HousingAssociationCollpseContent'

const { Panel } = Collapse

export const UserPanelCards: React.FC<OfficialUserInfoType> = ({
  userData,
  refetch,
}) => {
  const { user } = useAuth()
  const [cardStatus, setCardStatus] = useState<string>('4')
  const [usersCommunities, setUsersCommunities] = useState<number[]>([])
  const pageSize = 10
  const [currentPage, setCurrentPage] = useState(1)

  if (!user) {
    throw new Error('Brak uzytkownika!')
  }

  const getUserCommunities = () => {
    if (user) {
      return user.addressInfo?.map((address) => {
        return address.usersAddress_communityID
      })
    }

    return null
  }

  useEffect(() => {
    const communities = getUserCommunities()
    if (communities) {
      setUsersCommunities(communities)
    }
  }, [])

  const onChange = (event: RadioChangeEvent) => {
    setCardStatus(event.target.value as string)
  }

  const sortOptions = [
    { label: 'Aktywne', value: '4' },
    { label: 'Zablokowane', value: '5' },
    { label: 'Wszystkie', value: 'all' },
  ]

  const sortCardsByStatus = () => {
    if (userData?.cards) {
      const sortedCards = [...userData.cards]
      sortedCards.sort((a, b) => {
        if (a && b) {
          return a.usersCards_statusID - b.usersCards_statusID
        }

        return (a?.usersCards_ID ?? 1) - (b?.usersCards_ID ?? 0)
      })

      return sortedCards
    }
  }

  const cardsToShow = (status: string) => {
    const sortedCards = sortCardsByStatus()
    if (sortedCards === undefined) {
      return []
    }

    return status === 'all'
      ? sortedCards
      : userData?.cards
      ? userData?.cards.filter(
          (card) => card?.usersCards_statusID.toString() === status
        )
      : []
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const cardsNodes =
    cardsToShow(cardStatus).length > 0 ? (
      cardsToShow(cardStatus)
        .slice((currentPage - 1) * pageSize, currentPage * pageSize)
        .map((card) => {
          if (card) {
            return (
              <Panel
                className={styles.cardPanel}
                key={card.usersCards_ID}
                showArrow={true}
                collapsible={
                  card?.usersCards_statusID === CardStatus.ACTIVE
                    ? undefined
                    : 'disabled'
                }
                extra={
                  card?.usersCards_statusID === CardStatus.ACTIVE ? (
                    <div
                      data-action="stop-propagation"
                      onClick={(event) => {
                        event.stopPropagation()
                      }}
                    >
                      <UserDeleteCardForm
                        usersCards_ID={card.usersCards_ID}
                        cardNumber={card.usersCards_number}
                        refetch={refetch}
                      />
                    </div>
                  ) : null
                }
                header={
                  <div className={styles.cardHeader}>
                    <span>Numer karty dostępu: {card?.usersCards_number}</span>
                    <span>
                      Liczba przypisanych altan: {card?.dumpsters?.length}
                    </span>
                  </div>
                }
              >
                <div className={styles.dumpsterContentWrapper}>
                  {user.userType === UserType.HOUSING_ASSOCIATION &&
                  card?.usersCards_rentedToUserID ? (
                    <div className={styles.cardHousingAssociationWrapper}>
                      <HousingAssociationCollpseContent
                        cardID={card.usersCards_ID}
                        userID={card.usersCards_rentedToUserID}
                        refetchUserData={refetch}
                      />
                    </div>
                  ) : null}

                  {card?.dumpsters?.map((dumpster) => {
                    if (dumpster) {
                      return (
                        <div
                          key={dumpster.dumpster_ID}
                          className={styles.dumpsterWrapper}
                        >
                          <div>
                            <span className={styles.dumpsterName}>
                              Altana śmietnikowa nr {dumpster?.dumpster_name}
                            </span>
                            <span className={styles.dumpsterAddress}>
                              {dumpster?.dumpster_city},{' '}
                              {dumpster?.dumpster_street}{' '}
                              {dumpster?.dumpster_houseNumbers}
                            </span>
                          </div>
                          {card?.usersCards_statusID === CardStatus.ACTIVE &&
                          dumpster ? (
                            <UserDeleteDumpsterForm
                              card_ID={card.usersCards_ID}
                              dumpster_ID={dumpster.dumpster_ID}
                              cardNumber={card.usersCards_number}
                              dumpsterNumber={dumpster.dumpster_name}
                              refetch={refetch}
                            />
                          ) : null}
                        </div>
                      )
                    }

                    return null
                  })}

                  {card?.usersCards_statusID === CardStatus.ACTIVE &&
                  userData?.basicInfo &&
                  card.dumpsters ? (
                    <UserAddDumpsterForm
                      dumpstersIDs={card.dumpsters
                        .filter((d) => d !== null)
                        .map((dumpster) => dumpster!.dumpster_ID)}
                      usersCards_ID={card.usersCards_ID}
                      user_ID={userData.basicInfo?.users_ID}
                      cardNumber={card.usersCards_number}
                      users_communities={usersCommunities}
                      userType={userData.userType}
                      refetchUserData={refetch}
                    />
                  ) : null}
                </div>
              </Panel>
            )
          }

          return null
        })
    ) : (
      <div className={styles.noCardInfo}>Nie masz kart o wybranym statusie</div>
    )
  return (
    <>
      {userData?.basicInfo?.users_ID ? (
        <>
          <div className={styles.headerWrapper}>
            {user.userType === UserType.USER ? (
              <UserCreateCardForm
                userID={userData.basicInfo.users_ID}
                users_communities={usersCommunities}
              />
            ) : (
              <div />
            )}
            <Radio.Group
              options={sortOptions}
              onChange={onChange}
              value={cardStatus}
              optionType="button"
              className={styles.radioSelect}
            />
          </div>

          <Collapse accordion expandIconPosition="start" ghost={true}>
            {cardsNodes}
          </Collapse>

          <Pagination
            current={currentPage}
            total={cardsToShow(cardStatus).length}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
            style={{ marginTop: '20px', textAlign: 'center' }}
          />
        </>
      ) : null}
    </>
  )
}
