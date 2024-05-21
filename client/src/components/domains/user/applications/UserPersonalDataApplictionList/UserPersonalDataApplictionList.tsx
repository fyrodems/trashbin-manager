import { useState } from 'react'
import { Collapse } from 'antd'
import classNames from 'classnames'
import styles from '../applicationList.module.scss'
import { UserCancelApplicationForm } from '../UserCancelApplicationForm/UserCancelApplicationForm'
import {
  generateDateLabel,
  statusLabel,
  isChecked,
  reverseArray,
} from '../../../../../utils/applicationUtils'
import {
  type UserPersonalDataApplicationListProps,
  type PersonalDataApplication,
} from '../applicationsInterfaces'
import { CollapsedPanel } from '@/components/domains/common/CollapsedPanel'
import { PanelDetails } from '@/components/domains/common/PanelDetails'
import { PanelHeader } from '@/components/domains/common/PanelHeader'
import { PanelContentWrapper } from '@/components/domains/common/PanelContentWrapper'
import { PanelNoApplicationInfo } from '@/components/domains/common/PanelNoApplication'
import { ApplicationStatus } from '@/types/Status'

const { Panel } = Collapse

export const UserPersonalDataApplicationList: React.FC<
  UserPersonalDataApplicationListProps
> = ({ applicationList }) => {
  const [filterOption, setFilterOption] = useState<number>(0)
  const [index, setIndex] = useState({ startIndex: 0, endIndex: 5 })

  const { startIndex, endIndex } = index

  // update index from CollapsedPanel
  const getCurrentPageIndex = (e: { startIndex: number; endIndex: number }) => {
    setIndex(e)
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const displayedApplications: PersonalDataApplication[] = reverseArray(
    applicationList ?? []
  )
    .filter((application) => {
      if (filterOption === 0) {
        return true
      }

      return application.personalDataApplications_statusID === filterOption
    })
    .slice(startIndex, endIndex)

  const totalApplications = displayedApplications.length

  const cardsNodes =
    totalApplications > 0 ? (
      displayedApplications.map((application) => (
        <Panel
          className={styles.cardPanel}
          key={application.personalDataApplications_ID}
          showArrow={true}
          header={
            <div className={styles.cardHeader}>Edycja danych personalnych</div>
          }
          extra={
            <div className={styles.extra}>
              <span
                className={classNames(
                  styles.statusLabel,
                  styles[
                    statusLabel[
                      application.personalDataApplications_statusID
                    ] ?? 'Historyczny'
                  ]
                )}
              >
                {statusLabel[application.personalDataApplications_statusID] ??
                  'Historyczny'}
              </span>
              <div>
                <span>Data złożenia: </span>
                <span>
                  {generateDateLabel(
                    application.personalDataApplications_dateAdded
                  )}
                </span>
              </div>
            </div>
          }
        >
          <PanelContentWrapper>
            <PanelHeader title="Zadeklarowane dane" />
            <PanelDetails
              title="Imię i Nazwisko"
              value={application.personalDataApplications_name}
            />

            <div className={styles.applicationDetails}>
              <PanelDetails
                title="Data rozpatrzenia"
                value={
                  application.personalDataApplications_dateReviewed
                    ? isChecked(application.personalDataApplications_statusID)
                      ? generateDateLabel(
                          application.personalDataApplications_dateReviewed
                        )
                      : 'Brak danych'
                    : 'Brak danych'
                }
              />
            </div>
            {application.personalDataApplications_statusID ===
            ApplicationStatus.FOR_APPROVAL ? (
              <UserCancelApplicationForm
                application_ID={application.personalDataApplications_ID}
                applicationCategory={'personalData'}
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
      title="Dane personalne"
      applicationList={applicationList}
      setIndex={getCurrentPageIndex}
      statusKey="personalDataApplications_statusID"
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
