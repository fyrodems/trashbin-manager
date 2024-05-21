import { type GarbagePieChartType } from '@/gql/graphql'

export interface DonutChartProps {
  chartData: GarbagePieChartType
}

export interface TargetValueRadioChangeEventType {
  value: string
  checked: boolean
}

export interface WidthAndHightObjectType {
  width: number
  height: number
}

export interface ChartDataType {
  type: string
  value: number
}
