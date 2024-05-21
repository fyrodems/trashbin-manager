import {
  type GarbagePieChartType,
  type GarbageLineChartType,
  type UserGarbageSummaryQuery,
  type CardsWithMatchingDumpstersType,
} from '@/gql/graphql'

export interface UserCardsPreviewProps {
  cards: CardsWithMatchingDumpstersType[]
}

export interface UserReportForLast30DaysGarbageDonutChartProps {
  last30DaysGarbages: GarbagePieChartType
}

export interface UserReportForLast30DaysGarbageLineChartProps {
  last30DaysGarbages: GarbageLineChartType[]
}

export interface GarbageData {
  id: string
  week: number
  value: number
  year: number
}

export interface UserStateSetterProps {
  setLast30DaysGarbages: (data: UserGarbageSummaryQuery) => void
}
