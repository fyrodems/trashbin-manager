import { useState } from 'react'
import { Collapse } from 'antd'
import classNames from 'classnames'
import styles from '../applicationList.module.scss'
import { UserCancelApplicationForm } from '../UserCancelApplicationForm/UserCancelApplicationForm'
import {
  generateAddressTypeLabel,
  generateDateLabel,
  statusLabel,
  generateTypeLabel,
  isChecked,
  reverseArray,
} from '../../../../../utils/applicationUtils'
import {
  type UserAddressApplictionListProps,
  type UserAddressApplication,
} from '../applicationsInterfaces'
import { CollapsedPanel } from '@/components/domains/common/CollapsedPanel'
import { PanelDetails } from '@/components/domains/common/PanelDetails'
import { PanelHeader } from '@/components/domains/common/PanelHeader'
import { PanelContentWrapper } from '@/components/domains/common/PanelContentWrapper'
import { PanelNoApplicationInfo } from '@/components/domains/common/PanelNoApplication'
import { PanelDetailsSection } from '@/components/domains/common/PanelDetailsSection/PanelDetailsSection'
import { ApplicationStatus } from '@/types/Status'

const { Panel } = Collapse

export const UserAddressApplictionList: React.FC<
  UserAddressApplictionListProps
> = ({ applicationList }) => {
  const [filterOption, setFilterOption] = useState<number>(0)
  const [index, setIndex] = useState({ startIndex: 0, endIndex: 5 })

  const { startIndex, endIndex } = index

  const getCurrentPageIndex = (e: { startIndex: number; endIndex: number }) => {
    setIndex(e)
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const displayedApplications: UserAddressApplication[] = reverseArray(
    applicationList ?? []
  )
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
      displayedApplications.map((application) => (
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
            </div>
          }
          extra={
            <div className={styles.extra}>
              <span
                className={classNames(
                  styles.statusLabel,
                  styles[
                    statusLabel[application.addressApplications_statusID] ??
                      'Historyczny'
                  ]
                )}
              >
                {statusLabel[application.addressApplications_statusID] ??
                  'Historyczny'}
              </span>
              <div>
                <span>Data złożenia: </span>
                <span>
                  {generateDateLabel(application.addressApplications_dateAdded)}
                </span>
              </div>
            </div>
          }
        >
          <PanelContentWrapper>
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
                  application.addressApplications_dateReviewed
                    ? isChecked(application.addressApplications_statusID)
                      ? generateDateLabel(
                          application.addressApplications_dateReviewed
                        )
                      : 'Brak danych'
                    : 'Brak danych'
                }
              />
            </PanelDetailsSection>
            {application.addressApplications_statusID ===
            ApplicationStatus.FOR_APPROVAL ? (
              <UserCancelApplicationForm
                application_ID={application.addressApplications_ID}
                applicationCategory={'address'}
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
      title="Dane adresowe"
      applicationList={applicationList}
      setIndex={getCurrentPageIndex}
      statusKey="addressApplications_statusID"
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
