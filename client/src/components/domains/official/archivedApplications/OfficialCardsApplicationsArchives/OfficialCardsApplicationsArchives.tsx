import { useState } from 'react'
import { Collapse } from 'antd'
import classNames from 'classnames'
import styles from '../OfficialArchivedApplications.module.scss'
import {
  generateDateLabel,
  statusLabel,
  generateTypeLabel,
  isChecked,
  reverseArray,
} from '../../../../../utils/applicationUtils'
import {
  type OfficialCardsApplicationsArchivesProps,
  type OfficialCardArchiveApplication,
} from '../officialArchivedApplicationsInterfaces'
import { PanelDetails } from '@/components/domains/common/PanelDetails'
import { PanelHeader } from '@/components/domains/common/PanelHeader'
import { PanelContentWrapper } from '@/components/domains/common/PanelContentWrapper'
import { PanelNoApplicationInfo } from '@/components/domains/common/PanelNoApplication'
import { PanelDetailsSection } from '@/components/domains/common/PanelDetailsSection/PanelDetailsSection'
import { CollapsedPanel } from '@/components/domains/common/CollapsedPanel'

const { Panel } = Collapse

export const OfficialCardsApplicationsArchives: React.FC<
  OfficialCardsApplicationsArchivesProps
> = ({ applicationList }) => {
  const [filterOption, setFilterOption] = useState<number>(0)
  const [index, setIndex] = useState({ startIndex: 0, endIndex: 5 })

  const getCurrentPageIndex = (e: { startIndex: number; endIndex: number }) => {
    setIndex(e)
  }

  const { startIndex, endIndex } = index

  const displayedApplications = reverseArray(applicationList ?? [])
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
      displayedApplications.map(
        (application: OfficialCardArchiveApplication) => {
          if (application !== null) {
            return (
              <Panel
                className={styles.cardPanel}
                key={application.cardsApplications_ID}
                showArrow={true}
                header={
                  <div className={styles.cardHeader}>
                    {generateTypeLabel(application.cardsApplications_typeID)}
                    <span>{application.cardsApplications_userName}</span>
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
                        {generateDateLabel(
                          application.cardsApplications_dateAdded
                        )}
                      </span>
                    </div>
                  </div>
                }
              >
                <PanelContentWrapper>
                  <PanelHeader title="Dane wnioskodawcy" />
                  <PanelDetails
                    title="Imię i nazwisko"
                    value={application.cardsApplications_userName}
                  />
                  <PanelDetails
                    title="E-mail"
                    value={application.cardsApplications_userLogin}
                  />
                  <PanelDetails
                    title="PESEL"
                    value={
                      application.cardsApplications_userIdentificationNumber
                    }
                  />
                  <PanelDetailsSection>
                    <PanelDetails
                      title="Data rozpatrzenia"
                      value={
                        isChecked(application.cardsApplications_statusID)
                          ? generateDateLabel(
                              application.cardsApplications_dateReviewed ?? ''
                            )
                          : 'Brak danych'
                      }
                    />
                  </PanelDetailsSection>
                </PanelContentWrapper>
              </Panel>
            )
          }

          return null
        }
      )
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
        { value: 10, label: 'Zaakceptowane' },
        { value: 11, label: 'Odrzucone' },
      ]}
    >
      {cardsNodes}
    </CollapsedPanel>
  )
}
