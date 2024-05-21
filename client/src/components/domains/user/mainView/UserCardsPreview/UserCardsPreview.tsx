import { Collapse } from 'antd'
import { type UserCardsPreviewProps } from '../userMainViewInterfaces'
import styles from './UserCardsPreview.module.scss'

const { Panel } = Collapse

export const UserCardsPreview: React.FC<UserCardsPreviewProps> = ({
  cards,
}) => {
  const cardsNodes =
    cards.length > 0 ? (
      cards?.map((card) => (
        <Panel
          className={styles.cardPanel}
          key={card.usersCards_ID}
          showArrow={true}
          header={
            <div className={styles.cardHeader}>
              <span>Numer karty dostępu: {card.usersCards_number}</span>
              <span>
                Liczba przypisanych altan: {card.dumpsters?.length ?? 0}
              </span>
            </div>
          }
        >
          <div className={styles.dumpsterContentWrapper}>
            {card.dumpsters.length > 0 &&
              card.dumpsters.map((dumpster) => (
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
                </div>
              ))}
          </div>
        </Panel>
      ))
    ) : (
      <div className={styles.noCardInfo}>Nie masz aktywnych kart</div>
    )

  return (
    <Collapse accordion expandIconPosition="start" /* |end */ ghost={true}>
      {cardsNodes}
    </Collapse>
  )
}
