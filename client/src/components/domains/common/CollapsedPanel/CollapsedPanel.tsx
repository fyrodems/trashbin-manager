import { useEffect, useState } from 'react'
import { Collapse, Divider, Pagination, Select } from 'antd'
import {
  type PersonalDataApplication,
  type UserCardApplication,
  type UserContractApplication,
  type UserDumpsterApplication,
  type UserAddressApplication,
} from '../../user/applications/UserPanelApplications/interfaces'
import styles from './CollapsedPanel.module.scss'
import { reverseArray } from '@/utils/applicationUtils'

interface CollapsedPanelProps {
  applicationList?:
    | UserCardApplication[]
    | UserAddressApplication[]
    | UserDumpsterApplication[]
    | PersonalDataApplication[]
    | UserContractApplication[]
  title?: string
  children: React.ReactNode
  setIndex: ({
    startIndex,
    endIndex,
  }: {
    startIndex: number
    endIndex: number
  }) => void
  statusKey: string
  filterOption: number
  setFilterOption: React.Dispatch<React.SetStateAction<number>>
  options: Array<{ value: number; label: string }>
  total?: number
  defaultValue?: string
}

const pageSize = 5

export const CollapsedPanel: React.FC<CollapsedPanelProps> = ({
  applicationList,
  title,
  children,
  setIndex,
  statusKey,
  filterOption,
  setFilterOption,
  options,
  total,
  defaultValue,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const startIndex = (currentPage - 1) * pageSize
  const endIndex = currentPage * pageSize

  const handleSelectChange = (value: number | string) => {
    setFilterOption(Number(value))
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    if (!setIndex) return

    setIndex({ startIndex, endIndex })
  }, [startIndex, endIndex])

  return (
    <div>
      {title ? <Divider>{title}</Divider> : null}
      <Select
        className={styles.filterSelect}
        defaultValue={defaultValue ?? 'Filtruj'}
        style={{ width: 150 }}
        onChange={handleSelectChange}
        options={options}
      />
      <Collapse accordion ghost={true} expandIconPosition="start">
        {children}
      </Collapse>
      <Pagination
        className={styles.pagination}
        pageSize={pageSize}
        current={currentPage}
        total={
          total ??
          reverseArray(applicationList ?? []).filter((application) =>
            filterOption === 0 ? true : application[statusKey] === filterOption
          ).length
        }
        onChange={handlePageChange}
      />
    </div>
  )
}
