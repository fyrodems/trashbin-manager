/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable import/no-extraneous-dependencies */
import { type FC, useState } from 'react'
import { Column } from '@ant-design/plots'
import { Radio, type RadioChangeEvent } from 'antd'
import {
  type UserReportForLast30DaysGarbageLineChartProps,
  type GarbageData,
} from '../userMainViewInterfaces'
import { garbageUnitConverter } from '@/utils/garbage'

export const UserReportForLast30DaysGarbageLineChart: FC<
  UserReportForLast30DaysGarbageLineChartProps
> = ({ last30DaysGarbages }) => {
  const [unit, setUnit] = useState('kg')
  const [showInTons, setShowInTons] = useState(false)

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    if (value === 't') {
      setShowInTons(true)
    } else {
      setShowInTons(false)
      setUnit(value)
    }
  }

  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
    const days = Math.floor(
      (date.getTime() - firstDayOfYear.getTime()) / (24 * 60 * 60 * 1000)
    )
    return Math.ceil((days + firstDayOfYear.getDay() + 1) / 7)
  }

  const getDisplayUnit = () => {
    if (showInTons) {
      return 't'
    }

    return unit === 'kg' ? 'kg' : 'g'
  }

  // eslint-disable-next-line unicorn/no-array-reduce
  const data: GarbageData[] = (last30DaysGarbages ?? []).reduce(
    (acc: GarbageData[], entry) => {
      const weekNumber = getWeekNumber(new Date(entry.garbage_fullDate))
      const year = new Date(entry.garbage_fullDate).getFullYear()
      const existingEntry = acc.find((item) => item.week === weekNumber)

      if (existingEntry) {
        existingEntry.value += entry.garbage_sum
      } else {
        acc.push({
          id: `${year}-${weekNumber}`,
          week: weekNumber,
          value: entry.garbage_sum,
          year,
        })
      }

      return acc
    },
    []
  )

  const totalWeight = data.reduce((sum, entry) => sum + entry.value, 0)

  const convertedData = data.map((entry) => ({
    ...entry,
    value: showInTons
      ? garbageUnitConverter('t', entry.value)
      : garbageUnitConverter('kg', entry.value),
  }))

  const sortedData = convertedData.sort((a, b) =>
    a.year === b.year ? a.week - b.week : a.year - b.year
  )

  const prepData = sortedData.map((el) => {
    return { value: el.value, week: el.week.toString(), id: el.id }
  })

  const config = {
    data: prepData,
    xField: 'id',
    yField: 'value',
    color: '#5F8D4E',
    yAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
        formatter: (v: number) => `${v} ${getDisplayUnit()}`,
      },
    },
    xAxis: {
      label: {
        formatter: (v: string) => `${v.split('-')[1]}. tydzień roku`,
      },
    },
    tooltip: false,
    legend: false,
    smooth: true,
    columnWidthRatio: 0.8,
  }

  return (
    <div
      data-chart-type="line"
      style={{
        marginBottom: '50px',
      }}
    >
      {totalWeight >= 1_000_000 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '12px',
            marginBottom: '20px',
          }}
        >
          <span
            style={{ fontSize: '16px', display: 'inline', fontWeight: '400' }}
          >
            Pokaż w:
          </span>
          <Radio.Group
            options={[
              { label: 'Kilogramach', value: 'kg' },
              { label: 'Tonach', value: 't' },
            ]}
            onChange={onChange}
            value={showInTons ? 't' : unit}
            optionType="button"
          />
        </div>
      )}

      <Column {...config} />
    </div>
  )
}
