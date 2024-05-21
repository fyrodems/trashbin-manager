import React, { useState } from 'react'
import { Table, Tooltip } from 'antd'
import { TrashIcon } from './TrashIcon'
import styles from './UserReportYearlyGarbageTable.module.scss'
import {
  type MonthlyWeightsProps,
  type ActualYearGarbagesWeight,
  type ActualMonthGarbagesWeight,
} from '@/components/domains/user/interfaces/userInterfaces'
import { currentMonthNumber, getPolishMonthName, months } from '@/utils/months'
import { circularMapStartingAtIndex } from '@/utils/functions'

interface DataType {
  key: React.Key
  garbageType: React.ReactNode
}

interface TrashIconProps {
  fill: string
  tooltip: string
}

const TrashIconWithTooltip: React.FC<TrashIconProps> = ({ fill, tooltip }) => (
  <Tooltip title={tooltip} placement="bottom" arrow={false}>
    <span>
      <TrashIcon fill={fill} width="30" height="30" />
    </span>
  </Tooltip>
)

const generateGarbageTypeIcon = (garbageType: string) => {
  switch (garbageType) {
    case 'metaleITworzywa': {
      return <TrashIconWithTooltip fill="#FFE352" tooltip="Metale i tworzywa" />
    }

    case 'total': {
      return <TrashIconWithTooltip fill="#c9c9c9" tooltip="Suma" />
    }

    case 'papier': {
      return <TrashIconWithTooltip fill="#717ec5" tooltip="Papier" />
    }

    case 'bioodpady': {
      return <TrashIconWithTooltip fill="#4e2129" tooltip="Bioodpady" />
    }

    case 'szklo': {
      return <TrashIconWithTooltip fill="#257233" tooltip="Szkło" />
    }

    case 'zmieszane': {
      return <TrashIconWithTooltip fill="#2f2f2f" tooltip="Zmieszane" />
    }

    default: {
      return <TrashIconWithTooltip fill="#2f2f2f" tooltip="Brak danych" />
    }
  }
}

export const UserReportYearlyGarbageTable: React.FC<MonthlyWeightsProps> = ({
  actualYearWeights,
}) => {
  const [unit /* , setUnit */] = useState('kg')

  /*   const onChange = (e: React.ChangeEvent<any>) => {
    setUnit(e.target.value)
  } */

  const monthsInRightOrder = circularMapStartingAtIndex(
    months,
    currentMonthNumber + 1,
    (month) => month
  )

  const columns = [
    {
      title: '',
      width: 60,
      dataIndex: 'garbageType',
      key: 'garbageType',
      fixed: 'left',
    },
    ...monthsInRightOrder.map((month, index) => ({
      title: getPolishMonthName(month),
      dataIndex: month,
      key: (index + 1).toString(),
      width: 120,
    })),
  ]

  const garbageCategories = [
    'metaleITworzywa',
    'papier',
    'szklo',
    'bioodpady',
    'zmieszane',
  ]

  const generateTableData: DataType[] = garbageCategories.map((garbageType) => {
    // Dane tabeli w zależności od jednostki
    const rowData = {
      key: garbageType,
      garbageType: generateGarbageTypeIcon(garbageType),
    }

    for (const month of monthsInRightOrder) {
      const value =
        actualYearWeights[month as keyof ActualYearGarbagesWeight][
          garbageType as keyof ActualMonthGarbagesWeight
        ]

      rowData[month] =
        unit === 'kg' ? (value * 0.001).toFixed(2) + ' kg' : `${value} g`
    }

    return rowData
  })

  return (
    <section className={styles.tableContainer}>
      {/* <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '12px',
          marginBottom: '30px',
          marginTop: '30px',
        }}
      >
        <span
          style={{ fontSize: '16px', display: 'inline', fontWeight: '400' }}
        >
          Pokaż w:
        </span>
        <Radio.Group
          options={[
            { label: 'Gramach', value: 'g' },
            { label: 'Kilogramach', value: 'kg' },
          ]}
          onChange={onChange}
          value={unit}
          optionType="button"
        />
      </div> */}
      <Table
        columns={columns}
        dataSource={generateTableData}
        scroll={{ x: 1300, y: 500 }}
        pagination={false}
      />
    </section>
  )
}
