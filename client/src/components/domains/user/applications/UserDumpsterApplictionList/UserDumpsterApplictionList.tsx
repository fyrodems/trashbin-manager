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
  type UserDumpsterApplictionListProps,
  type UserDumpsterApplication,
} from '../applicationsInterfaces'
import { useAuth } from '@/auth/authProvider'
import { CollapsedPanel } from '@/components/domains/common/CollapsedPanel'
import { PanelDetails } from '@/components/domains/common/PanelDetails'
import { PanelHeader } from '@/components/domains/common/PanelHeader'
import { PanelContentWrapper } from '@/components/domains/common/PanelContentWrapper'
import { PanelNoApplicationInfo } from '@/components/domains/common/PanelNoApplication'
import { PanelDetailsSection } from '@/components/domains/common/PanelDetailsSection/PanelDetailsSection'
import { ApplicationStatus } from '@/types/Status'

const { Panel } = Collapse

export const UserDumpsterApplictionList: React.FC<
  UserDumpsterApplictionListProps
> = ({ applicationList }) => {
  const { user } = useAuth()
  const [filterOption, setFilterOption] = useState<number>(0)
  const [index, setIndex] = useState({ startIndex: 0, endIndex: 5 })

  const { startIndex, endIndex } = index

  // update index from CollapsedPanel
  const getCurrentPageIndex = (e: { startIndex: number; endIndex: number }) => {
    setIndex(e)
  }

  const findUserCardById = (cardId: number) => {
    if (user?.cards) {
      const card = user.cards.find((card) => card.usersCards_ID === cardId)
      return card ? card.usersCards_number : cardId
    }

    return cardId
  }

  const findUserDumpsterById = (dumpsterId: number) => {
    if (user?.dumpsters) {
      const dumpster = user.dumpsters.find(
        (dumpster) => dumpster.dumpster_ID === dumpsterId
      )
      return dumpster ? dumpster.dumpster_name : null
    }

    return dumpsterId
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const displayedApplications: UserDumpsterApplication[] = reverseArray(
    applicationList ?? []
  )
    .filter((application) => {
      if (filterOption === 0) {
        return true
      }

      return application.dumpstersApplications_statusID === filterOption
    })
    .slice(startIndex, endIndex)

  const totalApplications = displayedApplications.length

  const cardsNodes =
    totalApplications > 0 ? (
      displayedApplications.map((application) => (
        <Panel
          className={styles.cardPanel}
          key={application.dumpstersApplications_ID}
          showArrow={true}
          header={
            <div className={styles.cardHeader}>
              {generateTypeLabel(application.dumpstersApplications_typeID)}
            </div>
          }
          extra={
            <div className={styles.extra}>
              <span
                className={classNames(
                  styles.statusLabel,
                  styles[
                    statusLabel[application.dumpstersApplications_statusID] ??
                      'Historyczny'
                  ]
                )}
              >
                {statusLabel[application.dumpstersApplications_statusID] ??
                  'Historyczny'}
              </span>
              <div>
                <span>Data złożenia: </span>
                <span>
                  {generateDateLabel(
                    application.dumpstersApplications_dateAdded
                  )}
                </span>
              </div>
            </div>
          }
        >
          <PanelContentWrapper>
            <PanelHeader title="Szczegóły wniosku" />
            <PanelDetails
              title="Numer karty dostępu"
              value={findUserCardById(application.dumpstersApplications_cardID)}
            />
            <PanelDetails
              title="Numer altany"
              value={findUserDumpsterById(
                application.dumpstersApplications_dumpsterID
              )}
            />
            <PanelDetailsSection>
              <PanelDetails
                title="Data rozpatrzenia"
                value={
                  application.dumpstersApplications_dateReviewed
                    ? isChecked(application.dumpstersApplications_statusID)
                      ? generateDateLabel(
                          application.dumpstersApplications_dateReviewed
                        )
                      : 'Brak danych'
                    : 'Brak danych'
                }
              />
            </PanelDetailsSection>

            {application.dumpstersApplications_statusID ===
              ApplicationStatus.FOR_APPROVAL && (
              <UserCancelApplicationForm
                application_ID={application.dumpstersApplications_ID}
                applicationCategory={'dumpsters'}
              />
            )}
          </PanelContentWrapper>
        </Panel>
      ))
    ) : (
      <PanelNoApplicationInfo />
    )

  return (
    <CollapsedPanel
      title="Altany śmietnikowe"
      applicationList={applicationList}
      setIndex={getCurrentPageIndex}
      statusKey="dumpstersApplications_statusI"
      setFilterOption={setFilterOption}
      filterOption={filterOption}
      options={[
        { value: 0, label: 'Wszystkie' },
        { value: 9, label: 'Oczekujące' },
        { value: 11, label: 'Odrzucone' },
        { value: 12, label: 'Anulowane' },
        { value: 10, label: 'Zaakceptowane' },
      ]}
    >
      {cardsNodes}
    </CollapsedPanel>
  )
}
