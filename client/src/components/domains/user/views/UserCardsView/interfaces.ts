import { type UsersAddressInfoType } from '@/gql/commonTypes'

export interface UserFullDataType {
  userType: number
  basicInfo: OfficialUserSearchType
  cards?: OfficialCardsTypeWDumpstersType[]
  dumpsters?: DumpsterInfoType[]
  addressInfo?: UsersAddressInfoType[]
}

interface OfficialUserSearchType {
  users_ID: number
  users_login: string
  users_name: string
  users_identificationNumber: string
  users_phoneNumber?: string
  users_statusID?: number
}

interface OfficialCardsTypeWDumpstersType {
  usersCards_ID: number
  usersCards_userID: number
  usersCards_statusID: number
  usersCards_number: string
  usersCards_numberPIN: string
  dumpsters: DumpsterInfoType[]
}

interface DumpsterInfoType {
  dumpster_ID: number
  dumpster_name: string
  dumpster_description?: string
  dumpster_street: string
  dumpster_city: string
  dumpster_postCode: string
  dumpster_communityID: number
  dumpster_houseNumbers: string
  dumpster_hasError: boolean
  contracts?: ContractInfoType[]
  bins?: DumpsterBinType[]
}

interface ContractInfoType {
  dumpsterContract_ID: number
  dumpsterContract_number: string
  dumpsterContract_dumpsterID: number
  dumpsterContract_dateFrom: string
  dumpsterContract_dateTo: string
  dumpsterContract_statusID: number
  dumpsterContract_communityID: number
  rates?: RateInfoType[]
}
interface RateInfoType {
  rate_ID: number
  rate_typeID: number
  rate_dumpsterContractID?: number
  rate_userContractID?: number
  rate_value: number
}

interface DumpsterBinType {
  dumpsterBin_ID: number
  dumpsterBin_dumpsterID: number
  dumpsterBin_isFull: boolean
  dumpsterBin_typeID: number
}

export type UserCardsViewUserData = {
  userType: number
  basicInfo: {
    users_ID: number
  }
  cards?: Array<{
    usersCards_ID: number
    usersCards_statusID: number
    usersCards_number: string
    usersCards_rentedToUserID?: number | null
    dumpsters: Array<{
      dumpster_ID: number
      dumpster_name: string
      dumpster_city: string
      dumpster_street: string
      dumpster_houseNumbers: string
    } | null> | null
  } | null> | null
} | null
