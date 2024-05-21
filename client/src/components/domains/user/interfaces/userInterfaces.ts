import { type GarbageLineChartType } from '@/gql/graphql'

export interface MonthlyWeightsProps {
  actualYearWeights: {
    January: MonthlyData
    February: MonthlyData
    March: MonthlyData
    April: MonthlyData
    May: MonthlyData
    June: MonthlyData
    July: MonthlyData
    August: MonthlyData
    September: MonthlyData
    October: MonthlyData
    November: MonthlyData
    December: MonthlyData
  }
}

interface MonthlyData {
  papier: number
  bioodpady: number
  metaleITworzywa: number
  szklo: number
  zmieszane: number
  total: number
}

export interface UserCard {
  dumpsters: any[]
  usersCards_ID: number
  usersCards_number: string
  usersCards_numberPIN: string | null
  usersCards_statusID: number
  usersCards_userID: number
}

export interface UserContract {
  dumpsterContract_ID: number
  dumpsterContract_number: string
  dumpsterContract_dumpsterID: number
  dumpsterContract_dateFrom: string
  dumpsterContract_dateTo: string
  dumpsterContract_statusID: number
  dumpsterContract_communityID: number
}

export interface UserDumpster {
  dumpster_ID: number
  dumpster_city: string
  dumpster_communityID: number
  dumpster_description: string
  dumpster_houseNumbers: string
  dumpster_name: string
  dumpster_postCode: string
  dumpster_street: string
}

export interface ActualMonthGarbagesWeight {
  papier: number
  bioodpady: number
  metaleITworzywa: number
  szklo: number
  zmieszane: number
  total: number
}

export interface ActualYearGarbagesWeightPL {
  Styczeń: ActualMonthGarbagesWeight
  Luty: ActualMonthGarbagesWeight
  Marzec: ActualMonthGarbagesWeight
  Kwiecień: ActualMonthGarbagesWeight
  Maj: ActualMonthGarbagesWeight
  Czerwiec: ActualMonthGarbagesWeight
  Lipiec: ActualMonthGarbagesWeight
  Sierpień: ActualMonthGarbagesWeight
  Wrzesień: ActualMonthGarbagesWeight
  Październik: ActualMonthGarbagesWeight
  Listopad: ActualMonthGarbagesWeight
  Grudzień: ActualMonthGarbagesWeight
}

export interface ActualYearGarbagesWeight {
  January: ActualMonthGarbagesWeight
  February: ActualMonthGarbagesWeight
  March: ActualMonthGarbagesWeight
  April: ActualMonthGarbagesWeight
  May: ActualMonthGarbagesWeight
  June: ActualMonthGarbagesWeight
  July: ActualMonthGarbagesWeight
  August: ActualMonthGarbagesWeight
  September: ActualMonthGarbagesWeight
  October: ActualMonthGarbagesWeight
  November: ActualMonthGarbagesWeight
  December: ActualMonthGarbagesWeight
}

export interface UserRate {
  rate_ID: number
  rate_dateFrom: string
  rate_dateTo: string
  rate_typeGarbageID: number
  rate_usersContractID: number
  rate_usersID: number
  rate_value: number
}

export interface UserGarbagesRates {
  papier: null | number
  bioodpady: null | number
  metaleITworzywa: null | number
  szklo: null | number
  zmieszane: null | number
}

export interface Garbage {
  garbage_ID: number
  garbage_date: string
  garbage_dumpsterID: number
  garbage_typeID: number
  garbage_usersID: number
  garbage_sum: number
}

export interface GarbageTypeIDAsString {
  garbage_ID: number
  garbage_date: string
  garbage_dumpsterID: number
  garbage_typeID: string
  garbage_usersID: number
  garbage_weight: number
}

export type EnglishMonthType =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type YearlyGarbages = Record<EnglishMonthType, GarbageLineChartType[]>
