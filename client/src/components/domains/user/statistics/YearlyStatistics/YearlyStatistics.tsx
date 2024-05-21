import { useEffect, useMemo } from 'react'
import { Divider } from 'antd'
import { UserReportYearlyGarbageLineChart } from '../UserReportYearlyGarbageLineChart/UserReportYearlyGarbageLineChart'
import { UserReportYearlyGarbageTable } from '../UserReportYearlyGarbageTable/UserReportYearlyGarbageTable'
import useGarbageWeight from '../../hooks/useGarbageWeight'
import { DonutChart } from '@/components/domains/common/DonutChart'
import { useFetchGarbageData } from '@/components/domains/common/hooks/useFetchGarbageData'
import { getPreviousMonthGarbage } from '@/utils/months'

export const YearlyStatistics = () => {
  const {
    setActualYearGarbages,
    actualYearWeights,
    getGarbagesByMonth,
    actualYearGarbages,
  } = useGarbageWeight()

  const date = useMemo(() => {
    return {
      startDate: getPreviousMonthGarbage().firstDayLastYear,
      endDate: getPreviousMonthGarbage().today,
    }
  }, [])

  const { garbageData } = useFetchGarbageData({
    date,
    setActualYearGarbages,
  })

  useEffect(() => {
    getGarbagesByMonth()
  }, [actualYearGarbages])

  return (
    <>
      <div>
        {garbageData?.pieChart && (
          <DonutChart chartData={garbageData.pieChart} />
        )}
        <UserReportYearlyGarbageLineChart
          actualYearWeights={actualYearWeights}
        />
      </div>
      <Divider>Zestawienie tabelaryczne</Divider>
      <UserReportYearlyGarbageTable actualYearWeights={actualYearWeights} />
    </>
  )
}
