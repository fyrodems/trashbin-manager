/* eslint-disable @typescript-eslint/padding-line-between-statements */
import { useState } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Line } from '@ant-design/plots'
import { Radio, type RadioChangeEvent } from 'antd'
import {
  type ActualYearGarbagesWeight,
  type ActualMonthGarbagesWeight,
} from '../../interfaces/userInterfaces'
import { circularMapStartingAtIndex, isMobile } from '@/utils/functions'
import { currentMonthNumber, months } from '@/utils/months'

enum GarbageCategory {
  Metal = 'metaleITworzywa',
  Paper = 'papier',
  Glass = 'szklo',
  Organic = 'bioodpady',
  Mixed = 'zmieszane',
}

type GarbageType =
  | 'Metale i tworzywa'
  | 'Papier'
  | 'Szkło'
  | 'Bioodpady'
  | 'Zmieszane'

interface ChartData {
  garbageType: GarbageType
  month: string
  value: number
}

interface UserReportYearlyGarbageLineChartType {
  actualYearWeights: ActualYearGarbagesWeight
}

export const UserReportYearlyGarbageLineChart: React.FC<
  UserReportYearlyGarbageLineChartType
> = ({ actualYearWeights }) => {
  const [unit, setUnit] = useState('kg')
  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setUnit(value as string)
  }

  const monthsInRightOrder = circularMapStartingAtIndex(
    months,
    currentMonthNumber + 1,
    (month) => month
  )

  const garbageCategories = Object.values(GarbageCategory)
  const mapGarbageType = (type: string): GarbageType => {
    switch (type) {
      case GarbageCategory.Metal: {
        return 'Metale i tworzywa'
      }
      case GarbageCategory.Paper: {
        return 'Papier'
      }
      case GarbageCategory.Glass: {
        return 'Szkło'
      }
      case GarbageCategory.Organic: {
        return 'Bioodpady'
      }
      case GarbageCategory.Mixed: {
        return 'Zmieszane'
      }
      default: {
        return 'Zmieszane'
      }
    }
  }

  const data: ChartData[] = garbageCategories.flatMap((garbagesType) =>
    monthsInRightOrder.map((m, idx) => {
      const polishMonths = [
        'Styczeń',
        'Luty',
        'Marzec',
        'Kwiecień',
        'Maj',
        'Czerwiec',
        'Lipiec',
        'Sierpień',
        'Wrzesień',
        'Październik',
        'Listopad',
        'Grudzień',
      ]
      const month = polishMonths[idx]
      const garbageType = mapGarbageType(garbagesType)
      return {
        garbageType,
        month,
        value:
          actualYearWeights[m as keyof ActualYearGarbagesWeight][
            garbagesType as keyof ActualMonthGarbagesWeight
          ],
      }
    })
  )

  const chartData = data.map((item) => ({
    ...item,
    value: unit === 'g' ? item.value : (item.value * 1000) / 1000 / 1000,
  }))
  const totalWeight = chartData.reduce((sum, entry) => sum + entry.value, 0)
  const showRadioGroup = totalWeight >= 1000
  const config = {
    data: chartData,
    xField: 'month',
    yField: 'value',
    seriesField: 'garbageType',
    color: ['#FFE352', '#5278FF', '#257233', '#4e2129', '#2f2f2f'],
    yAxis: {
      label: {
        formatter: (v: number) => `${v} ${unit}`,
      },
    },
    legend: {
      layout: isMobile() ? 'horizontal' : 'vertical',
      position: isMobile() ? 'top' : 'right',
      flipPage: false,
      offsetY: -5,
      // maxRow: 5,
      itemName: {
        formatter(item: any) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return item.value
        },
      },
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 800,
      },
    },
  }
  return (
    <div
      data-chart-type="line"
      style={{
        marginBottom: '50px',
      }}
    >
      {showRadioGroup && (
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
              // { label: 'Gramach', value: 'g' },
              { label: 'Kilogramach', value: 'kg' },
              { label: 'Tonach', value: 't' },
            ]}
            onChange={onChange}
            value={unit}
            optionType="button"
          />
        </div>
      )}
      <Line {...config} />
    </div>
  )
}
