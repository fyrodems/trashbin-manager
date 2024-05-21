type WasteTypes = 'paper' | 'plastic' | 'glass' | 'bio' | 'mixed'

export interface BasicContract {
  rates: Record<WasteTypes, number | undefined>
}

export interface UserContractsQueryType {
  usersContract_ID: number
  usersContract_userID: number
  usersContract_number: string
  usersContract_dateFrom: string
  usersContract_dateTo: string
  usersContract_statusID: number
  usersContract_communityID: number
  rate_typeID: number
  rate_value: number
}

export interface HousingAssociationContractsQueryType {
  dumpsterContract_ID: number
  dumpsterContract_communityID: number
  dumpsterContract_dateFrom: string
  dumpsterContract_dateTo: string
  dumpsterContract_dumpsterID: number
  dumpsterContract_number: string
  dumpsterContract_statusID: number
  rate_typeID: number
  rate_value: number
}

export interface UserContractsResultType {
  usersContract_ID: number
  usersContract_number: string
  usersContract_userID: number
  usersContract_dateFrom: string
  usersContract_dateTo: string
  usersContract_statusID: number
  usersContract_communityID: number
  rates: Record<WasteTypes, number | undefined>
}

export interface HousingAssociationContractsType {
  dumpsterContract_ID: number
  dumpsterContract_communityID: number
  dumpsterContract_dateFrom: string
  dumpsterContract_dateTo: string
  dumpsterContract_dumpsterID: number
  dumpsterContract_number: string
  dumpsterContract_statusID: number
  rates: Record<WasteTypes, number | undefined>
}
