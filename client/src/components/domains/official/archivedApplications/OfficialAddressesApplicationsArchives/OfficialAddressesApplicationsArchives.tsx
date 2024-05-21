import { useState } from 'react'
import { Collapse } from 'antd'
import classNames from 'classnames'
import styles from '../OfficialArchivedApplications.module.scss'
import {
  generateAddressTypeLabel,
  generateDateLabel,
  statusLabel,
  generateTypeLabel,
  isChecked,
  reverseArray,
} from '../../../../../utils/applicationUtils'
import {
  type OfficialAddressesApplicationsArchivesProps,
  type OfficialAddressesArchiveApplication,
} from '../officialArchivedApplicationsInterfaces'
import { PanelDetails } from '@/components/domains/common/PanelDetails'
import { PanelHeader } from '@/components/domains/common/PanelHeader'
import { PanelContentWrapper } from '@/components/domains/common/PanelContentWrapper'
import { PanelNoApplicationInfo } from '@/components/domains/common/PanelNoApplication'
import { PanelDetailsSection } from '@/components/domains/common/PanelDetailsSection/PanelDetailsSection'
import { CollapsedPanel } from '@/components/domains/common/CollapsedPanel'

const { Panel } = Collapse

export const OfficialAddressesApplicationsArchives: React.FC<
  OfficialAddressesApplicationsArchivesProps
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

      return application.addressApplications_statusID === filterOption
    })
    .slice(startIndex, endIndex)

  const totalApplications = displayedApplications.length

  const cardsNodes =
    totalApplications > 0 ? (
      displayedApplications.map(
        (application: OfficialAddressesArchiveApplication) => {
          if (application !== null) {
            return (
              <Panel
                className={styles.cardPanel}
                key={application.addressApplications_ID}
                showArrow={true}
                header={
                  <div className={styles.cardHeader}>
                    {generateTypeLabel(application.addressApplications_typeID)}{' '}
                    {generateAddressTypeLabel(
                      application.addressApplications_addressTypeID
                    )}
                    <span>{application.addressApplications_userName}</span>
                  </div>
                }
                extra={
                  <div className={styles.extra}>
                    <span
                      className={classNames(
                        styles.statusLabel,
                        styles[
                          statusLabel[
                            application.addressApplications_statusID
                          ] ?? 'Historyczny'
                        ]
                      )}
                    >
                      {statusLabel[application.addressApplications_statusID] ??
                        'Historyczny'}
                    </span>
                    <div>
                      <span>Data złożenia: </span>
                      <span>
                        {generateDateLabel(
                          application.addressApplications_dateAdded
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
                    value={application.addressApplications_userName}
                  />
                  <PanelDetails
                    title="E-mail"
                    value={application.addressApplications_userLogin}
                  />
                  <PanelDetails
                    title="PESEL"
                    value={
                      application.addressApplications_userIdentificationNumber
                    }
                  />

                  <PanelHeader title="Szczegóły wniosku" />
                  <PanelDetails
                    title="Ulica"
                    value={application.addressApplications_street}
                  />
                  <PanelDetails
                    title="Numer budynku"
                    value={application.addressApplications_houseNumber}
                  />
                  {application.addressApplications_apartamentNumber && (
                    <PanelDetails
                      title="Numer lokalu"
                      value={application.addressApplications_apartamentNumber}
                    />
                  )}
                  <PanelDetails
                    title="Kod pocztowy"
                    value={application.addressApplications_postCode}
                  />
                  <PanelDetails
                    title="Miejscowość"
                    value={application.addressApplications_city}
                  />

                  <PanelDetailsSection>
                    <PanelDetails
                      title="Data rozpatrzenia"
                      value={
                        isChecked(application.addressApplications_statusID)
                          ? generateDateLabel(
                              application.addressApplications_dateReviewed ?? ''
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
      title="Dane adresowe"
      applicationList={applicationList}
      setIndex={getCurrentPageIndex}
      statusKey="addressApplications_statusID"
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
