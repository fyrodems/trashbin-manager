export interface DumpsterInfoType {
  dumpster_ID: number
  dumpster_name: string
  dumpster_description: string
  dumpster_street: string
  dumpster_city: string
  dumpster_postCode: string
  dumpster_communityID: number
  dumpster_houseNumbers: string
  dumpster_hasError: boolean
  contracts: DumpsterContract[]
  bins: DumpsterBin[]
}

export interface DumpsterContract {
  dumpsterContract_ID: number
  dumpsterContract_number: string
  dumpsterContract_dumpsterID: number
  dumpsterContract_dateFrom: string
  dumpsterContract_dateTo: string
  dumpsterContract_statusID: number
  dumpsterContract_communityID: number
  rates: DumpsterRate[]
}

export interface DumpsterRate {
  rate_ID: number
  rate_typeID: number
  rate_value: number
  rate_dumpsterContractID: number
  rate_statusID: number
  rate_userContractID: number
}

export interface DumpsterBin {
  dumpsterBin_ID: number
  dumpsterBin_dumpsterID: number
  dumpsterBin_isFull: boolean
  dumpsterBin_typeID: number
  dumpsterBin_type: string
}

export interface OfficialBinGetQueryResult {
  official: {
    bins: {
      get: DumpsterBin
    }
  }
}
