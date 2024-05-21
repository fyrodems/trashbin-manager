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
  type OfficialDumpstersApplicationsArchivesProps,
  type OfficialDumpsterArchiveApplication,
} from '../officialArchivedApplicationsInterfaces'
import { PanelDetails } from '@/components/domains/common/PanelDetails'
import { PanelHeader } from '@/components/domains/common/PanelHeader'
import { PanelContentWrapper } from '@/components/domains/common/PanelContentWrapper'
import { PanelNoApplicationInfo } from '@/components/domains/common/PanelNoApplication'
import { PanelDetailsSection } from '@/components/domains/common/PanelDetailsSection/PanelDetailsSection'
import { CollapsedPanel } from '@/components/domains/common/CollapsedPanel'

const { Panel } = Collapse

export const OfficialDumpstersApplicationsArchives: React.FC<
  OfficialDumpstersApplicationsArchivesProps
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

      return application.dumpstersApplications_statusID === filterOption
    })
    .slice(startIndex, endIndex)

  const totalApplications = displayedApplications.length

  const cardsNodes =
    totalApplications > 0 ? (
      displayedApplications.map(
        (application: OfficialDumpsterArchiveApplication) => {
          if (application !== null) {
            return (
              <Panel
                className={styles.cardPanel}
                key={application.dumpstersApplications_ID}
                showArrow={true}
                header={
                  <div className={styles.cardHeader}>
                    {generateTypeLabel(
                      application.dumpstersApplications_typeID
                    )}
                    <span>{application.dumpstersApplications_userName}</span>
                  </div>
                }
                extra={
                  <div className={styles.extra}>
                    <span
                      className={classNames(
                        styles.statusLabel,
                        styles[
                          statusLabel[
                            application.dumpstersApplications_statusID
                          ] ?? 'Historyczny'
                        ]
                      )}
                    >
                      {statusLabel[
                        application.dumpstersApplications_statusID
                      ] ?? 'Historyczny'}
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
                  <PanelHeader title="Dane wnioskodawcy" />
                  <PanelDetails
                    title="Imię i nazwisko"
                    value={application.dumpstersApplications_userName}
                  />
                  <PanelDetails
                    title="E-mail"
                    value={application.dumpstersApplications_userLogin}
                  />
                  <PanelDetails
                    title="PESEL"
                    value={
                      application.dumpstersApplications_userIdentificationNumber
                    }
                  />

                  <PanelHeader title="Szczegóły wniosku" />
                  <PanelDetails
                    title="Numer karty dostępu"
                    value={application.dumpstersApplications_cardNumber}
                  />
                  <PanelDetails
                    title="Numer altany"
                    value={application.dumpstersApplications_dumpsterNumber}
                  />

                  <PanelDetailsSection>
                    <PanelDetails
                      title="Data rozpatrzenia"
                      value={
                        isChecked(application.dumpstersApplications_statusID)
                          ? generateDateLabel(
                              application.dumpstersApplications_dateReviewed ??
                                ''
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
      title="Altany śmietnikowe"
      applicationList={applicationList}
      setIndex={getCurrentPageIndex}
      statusKey="dumpstersApplications_statusID"
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
