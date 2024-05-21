import { useState } from 'react'
import { Collapse } from 'antd'
import classNames from 'classnames'
import styles from '../applicationList.module.scss'
import { UserCancelApplicationForm } from '../UserCancelApplicationForm/UserCancelApplicationForm'
import {
  generateDateLabel,
  statusLabel,
  generateTypeLabel,
  isChecked,
  reverseArray,
} from '../../../../../utils/applicationUtils'
import {
  type UserCardsApplictionListProps,
  type UserCardApplication,
} from '../applicationsInterfaces'
import { CollapsedPanel } from '@/components/domains/common/CollapsedPanel'
import { PanelDetails } from '@/components/domains/common/PanelDetails'
import { PanelHeader } from '@/components/domains/common/PanelHeader'
import { PanelContentWrapper } from '@/components/domains/common/PanelContentWrapper'
import { PanelNoApplicationInfo } from '@/components/domains/common/PanelNoApplication'
import { PanelDetailsSection } from '@/components/domains/common/PanelDetailsSection/PanelDetailsSection'
import { ApplicationStatus } from '@/types/Status'

const { Panel } = Collapse

export const UserCardsApplictionList: React.FC<
  UserCardsApplictionListProps
> = ({ applicationList }) => {
  const [filterOption, setFilterOption] = useState<number>(0)
  const [index, setIndex] = useState({ startIndex: 0, endIndex: 5 })

  const { startIndex, endIndex } = index

  const getCurrentPageIndex = (e: { startIndex: number; endIndex: number }) => {
    setIndex(e)
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const displayedApplications: UserCardApplication[] = reverseArray(
    applicationList ?? []
  )
    .filter((application) => {
      if (filterOption === 0) {
        return true
      }

      return application.cardsApplications_statusID === filterOption
    })
    .slice(startIndex, endIndex)

  const totalApplications = displayedApplications.length
  const cardsNodes =
    totalApplications > 0 ? (
      displayedApplications.map((application) => (
        <Panel
          className={styles.cardPanel}
          key={application.cardsApplications_ID}
          showArrow={true}
          header={
            <div className={styles.cardHeader}>
              {generateTypeLabel(application.cardsApplications_typeID)}
            </div>
          }
          extra={
            <div className={styles.extra}>
              <span
                className={classNames(
                  styles.statusLabel,
                  styles[
                    statusLabel[application.cardsApplications_statusID] ??
                      'Historyczny'
                  ]
                )}
              >
                {statusLabel[application.cardsApplications_statusID] ??
                  'Historyczny'}
              </span>
              <div>
                <span>Data złożenia: </span>
                <span>
                  {generateDateLabel(application.cardsApplications_dateAdded)}
                </span>
              </div>
            </div>
          }
        >
          <PanelContentWrapper>
            <PanelHeader title="" />

            {/*     <PanelDetails
              title="Numer karty dostępu"
              value={
                isChecked(application.cardsApplications_statusID) &&
                application.cardsApplications_statusID !==
                  ApplicationStatus.REJECTED
                  ? application.cardsApplications_number
                  : 'Brak danych'
              }
            /> */}

            <PanelDetailsSection>
              <PanelDetails
                title="Data rozpatrzenia"
                value={
                  application.cardsApplications_dateReviewed
                    ? isChecked(application.cardsApplications_statusID)
                      ? generateDateLabel(
                          application.cardsApplications_dateReviewed
                        )
                      : 'Brak danych'
                    : 'Brak danych'
                }
              />
            </PanelDetailsSection>

            {application.cardsApplications_statusID ===
            ApplicationStatus.FOR_APPROVAL ? (
              <UserCancelApplicationForm
                application_ID={application.cardsApplications_ID}
                applicationCategory={'cards'}
              />
            ) : null}
          </PanelContentWrapper>
        </Panel>
      ))
    ) : (
      <PanelNoApplicationInfo />
    )

  return (
    <CollapsedPanel
      title="Karty dostępu"
      applicationList={applicationList}
      setIndex={getCurrentPageIndex}
      statusKey="cardsApplications_statusID"
      setFilterOption={setFilterOption}
      filterOption={filterOption}
      options={[
        { value: 0, label: 'Wszystkie' },
        { value: 9, label: 'Oczekujące' },
        { value: 10, label: 'Zaakceptowane' },
        { value: 11, label: 'Odrzucone' },
        { value: 12, label: 'Anulowane' },
      ]}
    >
      {cardsNodes}
    </CollapsedPanel>
  )
}
