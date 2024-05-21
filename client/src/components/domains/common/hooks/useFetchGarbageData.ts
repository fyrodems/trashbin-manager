import { useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import {
  type EnglishMonthType,
  type YearlyGarbages,
} from '../../user/interfaces/userInterfaces'
import { type FetchDateType } from '../../user/statistics/interfaces/StatisticInterfaces'
import { graphql } from '@/gql'
import { type UserGarbageSummaryQuery } from '@/gql/graphql'

const GarbageDataQuery = graphql(`
  query UserGarbageGet($props: UserGarbageGetQueryProps!) {
    user {
      garbage {
        get {
          result(props: $props) {
            pieChart {
              total
              garbageTypes {
                color
                mass
                type
                typeID
              }
            }
            lineChart {
              garbage_sum
              garbage_typeID
              month
              monthIndex
              waste_name
              garbage_fullDate
            }
          }
        }
      }
    }
  }
`)

interface UseFetchGarbageDataProps {
  date: FetchDateType | null
  setActualYearGarbages?: React.Dispatch<React.SetStateAction<YearlyGarbages>>
}

export const useFetchGarbageData = ({
  date,
  setActualYearGarbages,
}: UseFetchGarbageDataProps) => {
  const [garbageData, setGarbageData] =
    useState<UserGarbageSummaryQuery | null>(null)
  const [search, { loading, data }] = useLazyQuery(GarbageDataQuery, {
    fetchPolicy: 'no-cache',
  })

  useEffect(() => {
    ;(async () => {
      if (!date) return

      await search({
        variables: {
          props: {
            garbage_endDate: date.endDate,
            garbage_startDate: date.startDate,
          },
        },
      })
    })()
  }, [date])

  useEffect(() => {
    if (!data || loading) return

    const chartsData = data.user?.garbage?.get?.result

    if (!chartsData) return

    const garbagesByMonth: YearlyGarbages = {
      January: [],
      February: [],
      March: [],
      April: [],
      May: [],
      June: [],
      July: [],
      August: [],
      September: [],
      October: [],
      November: [],
      December: [],
    }

    for (const g of chartsData.lineChart) {
      const monthIndex = g.monthIndex
      const monthName = new Date(2022, monthIndex - 1, 1).toLocaleString(
        'en-US',
        { month: 'long' }
      ) as EnglishMonthType

      if (!garbagesByMonth[monthName]) {
        garbagesByMonth[monthName] = []
      }

      garbagesByMonth[monthName].push(g)
    }

    if (setActualYearGarbages) setActualYearGarbages(garbagesByMonth)
    setGarbageData(chartsData)
  }, [data])

  return { loading, garbageData }
}
