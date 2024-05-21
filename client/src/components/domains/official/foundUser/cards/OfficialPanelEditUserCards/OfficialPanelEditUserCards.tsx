import { useState } from 'react'
import { Button, Collapse, Divider, Radio, type RadioChangeEvent } from 'antd'
import { OfficialEditCardForm } from '../OfficialEditCardForm/OfficialEditCardForm'
import { OfficialDeleteDumpster } from '../OfficialDeleteDumpster/OfficialDeleteDumpster'
import { OfficialCreateDumpsterForm } from '../OfficialCreateDumpsterForm/OfficialCreateDumpsterForm'
import { type Card, type OfficialEditUserCardsProps } from '../cardsInterfaces'
import { OfficialCreateCardForm } from '../../OfficialCreateCardForm/OfficialCreateCardForm'
import editIcon from '../../../../../../assets/editIcon.png'
import styles from './OfficialPanelEditUserCards.module.scss'
import { useAuth } from '@/auth/authProvider'
import { extractUniqueCommunities } from '@/utils/extractUniqueCommunities'
import { Status } from '@/types/Status'

const { Panel } = Collapse

export const OfficialPanelEditUserCards: React.FC<
  OfficialEditUserCardsProps
> = ({ userInfoData, refetch }) => {
  const [cardStatus, setCardStatus] = useState<string>('4')
  const [isEditCardOpen, setIsEditCardOpen] = useState(false)
  const [chosenCard, setChosenCard] = useState<Card | undefined>(undefined)
  const { user } = useAuth()

  const onChange = (e: RadioChangeEvent) => {
    setCardStatus(e.target.value as string)
  }

  const sortOptions = [
    { label: 'Aktywne', value: '4' },
    { label: 'Zablokowane', value: '5' },
  ]

  const { cards } = userInfoData

  const sortCardsByStatus = () => {
    const sortedCards = [...cards]
    sortedCards.sort((a, b) => {
      if (a && b) {
        return a.usersCards_statusID - b.usersCards_statusID
      }

      return (a?.usersCards_ID ?? 1) - (b?.usersCards_ID ?? 0)
    })
    return sortedCards
  }

  const cardsToShow = (status: string) => {
    const sortedCards = sortCardsByStatus()
    return status === 'all'
      ? sortedCards
      : cards.filter((card) => card?.usersCards_statusID.toString() === status)
  }

  const cardsNodes =
    cardsToShow(cardStatus).length > 0 ? (
      cardsToShow(cardStatus).map((card) => {
        if (card) {
          return (
            <Panel
              className={styles.cardPanel}
              key={card.usersCards_ID}
              showArrow={true}
              extra={
                <div
                  data-action="stop-propagation"
                  onClick={(event) => {
                    event.stopPropagation()
                  }}
                >
                  <Button
                    onClick={() => {
                      setIsEditCardOpen(true)
                      setChosenCard(card)
                    }}
                    className={styles.editButton}
                  >
                    <img src={editIcon} alt="Edit icon" /> Edytuj dane
                  </Button>
                </div>
              }
              header={
                <div className={styles.cardHeader}>
                  <span>Numer karty dostępu: {card.usersCards_number}</span>
                  <span>
                    Liczba przypisanych altan: {card.dumpsters.length}
                  </span>
                </div>
              }
            >
              <div className={styles.dumpsterContentWrapper}>
                {card.dumpsters.map((dumpster) => {
                  if (dumpster !== null) {
                    return (
                      <div
                        key={dumpster.dumpster_name}
                        className={styles.dumpsterWrapper}
                      >
                        <div>
                          <span className={styles.dumpsterName}>
                            Altana śmietnikowa nr {dumpster.dumpster_name}
                          </span>
                          <span className={styles.dumpsterAddress}>
                            {dumpster.dumpster_city}, {dumpster.dumpster_street}{' '}
                            {dumpster.dumpster_houseNumbers}
                          </span>
                        </div>
                        {card.usersCards_statusID === Status.ACTIVE ? (
                          <OfficialDeleteDumpster
                            card_ID={card.usersCards_ID}
                            dumpster_ID={dumpster.dumpster_ID}
                            refetch={refetch}
                          />
                        ) : null}
                      </div>
                    )
                  }

                  return null
                })}
              </div>
              {user?.addressInfo ? (
                <OfficialCreateDumpsterForm
                  cardData={card}
                  refetch={refetch}
                  userCommunityIDs={extractUniqueCommunities(
                    userInfoData?.addressInfo.map((a) => ({
                      usersAddress_communityID: a!.usersAddress_communityID,
                    }))
                  )}
                  officialCommunityIDs={extractUniqueCommunities(
                    user?.addressInfo.map((a) => ({
                      usersAddress_communityID: a.usersAddress_communityID,
                    }))
                  )}
                />
              ) : null}
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
      {isEditCardOpen && chosenCard ? (
        <OfficialEditCardForm
          open={isEditCardOpen}
          setOpen={setIsEditCardOpen}
          cardData={chosenCard}
          refetch={refetch}
        />
      ) : null}
      {userInfoData ? (
        <>
          <Divider>Karty dostępu</Divider>
          <div className={styles.headerWrapper}>
            <OfficialCreateCardForm userData={userInfoData} refetch={refetch} />
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
        </>
      ) : null}
    </>
  )
}
