import { useState } from 'react'
import { type FetchDateType } from '../interfaces/StatisticInterfaces'
import { useFetchGarbageData } from '@/components/domains/common/hooks/useFetchGarbageData'
import { DonutChart } from '@/components/domains/common/DonutChart'
import { PeriodPicker } from '@/components/domains/common/PeriodPicker/PeriodPicker'

export const PeriodStatistics = () => {
  const [date, setDate] = useState<FetchDateType | null>(null)

  const { garbageData, loading } = useFetchGarbageData({
    date,
  })

  return (
    <>
      <PeriodPicker setDate={setDate} loading={loading} />
      {garbageData?.pieChart && <DonutChart chartData={garbageData.pieChart} />}
    </>
  )
}
