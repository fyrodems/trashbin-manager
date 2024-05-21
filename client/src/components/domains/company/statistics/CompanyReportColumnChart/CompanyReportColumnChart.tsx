/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Column } from '@ant-design/plots'
import { useState } from 'react'
import { type CompanyGarbageProps, type TotalGarbage } from '../interfaces'
import { getGarbageLabel } from '@/utils/garbage'

export const CompanyReportColumnChart: React.FC<CompanyGarbageProps> = ({
  allGarbage,
}) => {
  const [unit, setUnit] = useState<string>('kg')

  if (!allGarbage) return null

  const allGarbageEverThrownAway = (): TotalGarbage => {
    let szklo = 0
    let bioodpady = 0
    let zmieszane = 0
    let papier = 0
    let metaleITworzywa = 0

    for (const dumpster of allGarbage) {
      if (dumpster.garbage && typeof dumpster.garbage === 'object') {
        szklo += dumpster.garbage.glass || 0
        bioodpady += dumpster.garbage.bio || 0
        zmieszane += dumpster.garbage.mixed || 0
        papier += dumpster.garbage.paper || 0
        metaleITworzywa += dumpster.garbage.plastic || 0
      }
    }

    const convertGarbage = (value: number): number => {
      const conversionFactor = unit === 'kg' ? 1 / 1000 : 1 / 1_000_000
      return Number((value * conversionFactor).toFixed(2))
    }

    return {
      metaleITworzywa: convertGarbage(metaleITworzywa),
      papier: convertGarbage(papier),
      szklo: convertGarbage(szklo),
      bioodpady: convertGarbage(bioodpady),
      zmieszane: convertGarbage(zmieszane),
    }
  }

  // Dane do wykresu
  const chartData = []
  const garbageToShow = allGarbageEverThrownAway()

  for (const key in garbageToShow) {
    if (garbageToShow.hasOwnProperty(key)) {
      const newObj = {
        garbageType: key,
        value: garbageToShow[key],
      }
      chartData.push(newObj)
    }
  }

  const garbageColors = {
    metaleITworzywa: '#FFE352',
    papier: '#5278FF',
    szklo: '#5F8D4E',
    bioodpady: '#4e2129',
    zmieszane: '#2f2f2f',
  }

  // Konfiguracja wykresu
  const config = {
    data: chartData,
    xField: 'garbageType',
    yField: 'value',
    color: (data: { garbageType: string | number }) =>
      garbageColors[data.garbageType],
    yAxis: {
      label: {
        formatter: (v: number) => `${v} ${unit}`,
      },
    },
    xAxis: {
      label: {
        formatter: (v: number) => getGarbageLabel(v.toString()),
      },
    },
    tooltip: {
      title() {
        return null
      },
      customContent(title: string, data) {
        return `<div style="padding: 10px;"> ${data[0]?.value} ${unit}</div>`
      },
    },
    legend: false,
    smooth: true,
  }

  return <Column {...config} />
}
