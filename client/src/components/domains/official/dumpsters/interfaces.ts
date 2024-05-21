export interface DumpsterInfoType {
  dumpster_ID: number
  dumpster_name: string
  dumpster_description?: string | null
  dumpster_street: string
  dumpster_city: string
  dumpster_postCode: string
  dumpster_communityID: number
  dumpster_houseNumbers: string
  dumpster_hasError: boolean
  contracts?: ContractInfoType[]
  bins?: DumpsterBinType[]
}

export type ContractInfoType = {
  dumpsterContract_ID: number
  dumpsterContract_number: string
  dumpsterContract_dateFrom: string
  dumpsterContract_dateTo: string
  dumpsterContract_statusID: number
  dumpsterContract_dumpsterID: number
  rates?: RateInfoType[] | null
} | null

export type RateInfoType = {
  rate_ID: number
  rate_typeID: number
  rate_dumpsterContractID?: number
  rate_userContractID?: number
  rate_value: number
} | null

type DumpsterBinType = {
  dumpsterBin_typeID: number
  dumpsterBin_isFull: boolean
} | null
