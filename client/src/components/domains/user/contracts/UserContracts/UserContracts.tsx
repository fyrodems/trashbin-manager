/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Collapse } from 'antd'
import { useState } from 'react'
import { Radio, type RadioChangeEvent } from 'antd'
import {
  type DumpsterContractType,
  type HousingAssociation,
  type UserContractsInterface,
  type UserContractsProps,
} from '../userContractsInterfaces'
import styles from './UserContracts.module.scss'
import { ContractStatus } from '@/types/Status'
import { CollapsedPanel } from '@/components/domains/common/CollapsedPanel'
import { reverseArray } from '@/utils/applicationUtils'

const { Panel } = Collapse

export const UserContracts: React.FC<UserContractsProps> = ({
  userContractsData,
}) => {
  const [selectedStatusId, setSelectedStatusId] = useState<string>('15')
  const [filterOption, setFilterOption] = useState<number>(1)
  const [index, setIndex] = useState({ startIndex: 0, endIndex: 5 })

  const { startIndex, endIndex } = index

  // update index from CollapsedPanel
  const getCurrentPageIndex = (e: { startIndex: number; endIndex: number }) => {
    setIndex(e)
  }

  const onChange = (e: RadioChangeEvent) => {
    setSelectedStatusId(e.target.value as string)
  }

  const sortOptions = [
    { label: 'Aktywna', value: '15' },
    { label: 'Historyczne', value: '16' },
  ]

  function isContractHistoric(contractStatus: number, dateTo: string): boolean {
    if (contractStatus === 16) {
      return true
    }

    const givenDate = new Date(dateTo)
    const currentDate = new Date()
    return givenDate.getTime() < currentDate.getTime()
  }

  const displayedUserContracts = reverseArray(
    userContractsData.userContracts ?? []
  )

  const displayedHAContracts = reverseArray(
    userContractsData.housingAssociation ?? []
  )

  const filteredHAContracts = displayedHAContracts.filter(
    (contract: HousingAssociation) => {
      if (filterOption === 0) {
        return true
      }

      if (contract?.dumpsterContract_statusID) {
        const isHistoric = isContractHistoric(
          contract?.dumpsterContract_statusID ?? 16,
          contract?.dumpsterContract_dateTo ?? new Date().toString()
        )

        if (filterOption === 2 && isHistoric && selectedStatusId === '15') {
          return false
        }

        if (filterOption === 2 && !isHistoric && selectedStatusId === '15') {
          return true
        }

        if (filterOption === 2 && !isHistoric && selectedStatusId === '16') {
          return false
        }

        if (filterOption === 2 && isHistoric && selectedStatusId === '16') {
          return true
        }
      }

      return false
    }
  )

  const filteredUserContracts = displayedUserContracts.filter(
    (contract: UserContractsInterface) => {
      if (filterOption === 0) {
        return true
      }

      if (contract?.usersContract_statusID) {
        const isHistoric = isContractHistoric(
          contract?.usersContract_statusID ?? 16,
          contract?.usersContract_dateTo ?? new Date().toString()
        )

        if (filterOption === 1 && isHistoric && selectedStatusId === '15')
          return false
        if (filterOption === 1 && !isHistoric && selectedStatusId === '15')
          return true
        if (filterOption === 1 && !isHistoric && selectedStatusId === '16')
          return false
        if (filterOption === 1 && isHistoric && selectedStatusId === '16')
          return true
      }

      return false
    }
  )

  const totalContracts = [...filteredHAContracts, ...filteredUserContracts]
    .length

  const contractsNodes =
    totalContracts > 0 ? (
      [...filteredHAContracts, ...filteredUserContracts]
        .slice(startIndex, endIndex)
        .map((contract: DumpsterContractType) => {
          if (contract) {
            return (
              <Panel
                className={styles.contractPanel}
                key={
                  contract.dumpsterContract_ID ??
                  contract.usersContract_ID ??
                  ''
                }
                showArrow={true}
                collapsible={undefined}
                extra={
                  contract.dumpsterContract_statusID ===
                  ContractStatus.CURRENT ? (
                    <div
                      data-action="stop-propagation"
                      onClick={(event) => {
                        event.stopPropagation()
                      }}
                    ></div>
                  ) : null
                }
                header={
                  <div className={styles.contractHeader}>
                    <span>
                      Numer umowy:{' '}
                      {contract.dumpsterContract_number ??
                        contract.usersContract_number}
                    </span>
                    <span>
                      Ważna do:{' '}
                      {contract.dumpsterContract_dateTo?.slice(0, 10) ??
                        contract.usersContract_dateTo?.slice(0, 10) ??
                        'Brak danych'}
                    </span>
                  </div>
                }
              >
                <div className={styles.contractContentWrapper}>
                  <div className={styles.contractWrapper}>
                    <div>
                      <span className={styles.contractName}>
                        Stawka papier: {contract.rates?.paper ?? 'Brak danych'}
                      </span>
                    </div>
                    <div>
                      <span className={styles.contractName}>
                        Stawka plastik:{' '}
                        {contract.rates?.plastic ?? 'Brak danych'}
                      </span>
                    </div>
                    <div>
                      <span className={styles.contractName}>
                        Stawka szkło: {contract.rates?.glass ?? 'Brak danych'}
                      </span>
                    </div>
                    <div>
                      <span className={styles.contractName}>
                        Stawka bio: {contract.rates?.bio ?? 'Brak danych'}
                      </span>
                    </div>
                    <div>
                      <span className={styles.contractName}>
                        Stawka zmieszane:{' '}
                        {contract.rates?.mixed ?? 'Brak danych'}
                      </span>
                    </div>
                  </div>
                </div>
              </Panel>
            )
          }

          return null
        })
    ) : (
      <div className={styles.noContractInfo}>Brak pasujących umów</div>
    )

  return (
    <>
      <Radio.Group
        className={styles.groupRadio}
        options={sortOptions}
        onChange={(e) => {
          onChange(e)
        }}
        value={selectedStatusId}
        optionType="button"
      />

      <CollapsedPanel
        applicationList={[...filteredHAContracts, ...filteredUserContracts]}
        setIndex={getCurrentPageIndex}
        statusKey=""
        options={[
          { value: 1, label: 'Umowy z gminą' },
          { value: 2, label: 'Umowy ze spółdzielnią' },
        ]}
        setFilterOption={setFilterOption}
        filterOption={filterOption}
        total={[...filteredHAContracts, ...filteredUserContracts].length}
        defaultValue="Umowy z gminą"
      >
        {contractsNodes}
      </CollapsedPanel>
    </>
  )
}
