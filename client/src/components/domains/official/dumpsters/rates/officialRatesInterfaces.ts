export interface RateValues {
  rate_value: number
  rate_typeID: number
}

export interface RateUpdateProps {
  open: boolean
  setOpen: (state: boolean) => void
  rateData: {
    rate_ID: number
    rate_value: number
    rate_typeID: number
  }
}

export interface DeleteRateValue {
  rate_ID: number
}

export interface RateInfo {
  rate_value: number
  rate_typeID: number
  rate_dumpsterContractID?: number
  rate_userContractID?: number
}

export interface OfficialCreateRateFormProps {
  contractID: number
}
