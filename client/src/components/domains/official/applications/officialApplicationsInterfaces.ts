import { type ApolloQueryResult } from '@apollo/client'
import { type CurrentUserQuery } from '@/gql/userGraphs'

export interface NewCardVerificationValues {
  isVerified: boolean
  card_number?: string
  cardsApplications_ID: number
}
export interface OfficialApplicationUpdateCardValues {
  cardsApplications_number: string
}

export interface CardValues {
  isVerified: boolean
  card_number?: string
  cardsApplications_ID: number
  user_ID?: number
}

export interface ApplicationUpdateProps {
  open: boolean
  setOpen: (state: boolean) => void
  verify: (arg0: VeifyVariables) => void
  reviewer: {
    userType?: number
    basicInfo?: OfficialUserSearchType
    cards?: OfficialCardsTypeWDumpstersType[]
    dumpsters?: DumpsterInfoType[]
    addressInfo?: UsersAddressInfoType[]
  }
  actualApplicationID: number
  actualApplicationUserID: number
  refetch: (
    variables?: Partial<Record<string, any>> | undefined
  ) => Promise<ApolloQueryResult<CurrentUserQuery>>
}

interface VeifyVariables {
  variables: VerifyProps
}

interface VerifyProps {
  props: VerifyPropsValues
}

interface VerifyPropsValues {
  isVerified: boolean
  card_number: string
  reviewer: number
  cardsApplications_ID: number
  user_ID: number
}

interface OfficialCardsTypeWDumpstersType {
  usersCards_ID: number
  usersCards_userID: number
  usersCards_statusID: number
  usersCards_number: string
  usersCards_numberPIN: string
  dumpsters: DumpsterInfoType[]
}

interface OfficialUserSearchType {
  users_ID: number
  users_login: string
  users_name: string
  users_identificationNumber: string
  users_phoneNumber?: string
  users_statusID?: number
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

export interface NewCardType {
  cardsApplications_ID: number
  cardsApplications_dateAdded: string
  cardsApplications_dateReviewed?: string | null
  cardsApplications_typeID: number
  cardsApplications_reviewedBy?: number | null
  cardsApplications_userID: number
  cardsApplications_statusID: number
  user?: {
    users_ID: number
    users_name: string
  }
  dumpsters: NewCardDumpsterType[]
}

type NewCardDumpsterType = {
  dumpster_ID: number
  dumpster_name: string
} | null

export interface DumpsterDataType {
  __typename?: 'DumpsterDataType'
  dumpster_ID: number
  dumpster_name: string
  dumpster_description?: string
  dumpster_street: string
  dumpster_city: string
  dumpster_postCode: string
  dumpster_communityID: number
  dumpster_houseNumbers: string
  dumpster_hasError: boolean
}

interface UsersAddressInfoType {
  usersAddress_ID: number
  usersAddress_userID: number
  usersAddress_street: string
  usersAddress_houseNumber: string
  usersAddress_apartamentNumber?: string
  usersAddress_postCode: string
  usersAddress_city: string
  usersAddress_typeID: number
  usersAddress_communityID: number
}

export interface OfficialApplicationCardsProps {
  searchData: string
}

export interface NewUserVerificationValues {
  isVerified: boolean
  userID: number
}

export interface FoundUser {
  addresses: NewUserAddress[]
  users_ID: number
  users_identificationNumber: string
  users_login: string
  users_name: string
  users_phoneNumber?: string | null
  users_statusID: number
}

interface NewUserAddress {
  usersAddress_street: string
  usersAddress_houseNumber: string
  usersAddress_apartamentNumber?: string | null
  usersAddress_postCode: string
  usersAddress_city: string
}

export interface OfficialApplicationNewUsersProps {
  searchData: string
}

export interface NewAddressInfoVerificationValues {
  isVerified: boolean
  addressApplications_ID: number
  reviewer: number
  user_ID: number
}

export interface OfficialApplicationNewAddressProps {
  searchData: string
}

export interface OfficialNewAddressApplication {
  addressApplications_ID: number
  addressApplications_addressID?: number | null
  addressApplications_apartamentNumber?: string | null
  addressApplications_typeID: number
  addressApplications_city: string
  addressApplications_communityID: number
  addressApplications_dateAdded: string
  addressApplications_dateReviewed?: string | null
  addressApplications_houseNumber: string
  addressApplications_postCode: string
  addressApplications_reviewedBy?: number | null
  addressApplications_statusID: number
  addressApplications_street: string
  addressApplications_addressTypeID: number
  addressApplications_userID: number
  user: {
    users_ID: number
    users_name: string
  }
}

export interface EditUserInfoVerificationValues {
  isVerified: boolean
  personalDataApplications_ID: number
  reviewer: number
  user_ID: number
}

export interface OfficialApplicationEditPersonalDataProps {
  searchData: string
}

export interface OfficialPersonalDataApplication {
  personalDataApplications_ID: number
  personalDataApplications_typeID: number
  personalDataApplications_dateAdded: string
  personalDataApplications_dateReviewed?: string | null
  personalDataApplications_name: string
  personalDataApplications_oldName: string
  personalDataApplications_reviewedBy?: number | null
  personalDataApplications_statusID: number
  personalDataApplications_userID: number
}

export interface EditAddressInfoVerificationValues {
  isVerified: boolean
  addressApplications_ID: number
  reviewer: number
  userAddress_ID: number
}

export interface AddressApplication {
  addressApplications_ID: number
  addressApplications_dateAdded: string
  addressApplications_dateReviewed: string
  addressApplications_typeID: number
  addressApplications_reviewedBy: string
  addressApplications_userID: number
  addressApplications_statusID: number
  addressApplications_street: string
  addressApplications_houseNumber: string
  addressApplications_apartamentNumber: string
  addressApplications_postCode: string
  addressApplications_city: string
  addressApplications_addressTypeID: number
  addressApplications_communityID: number
  addressApplications_addressID: number
  user: OfficialInfoType
}

interface OfficialInfoType {
  users_ID: number
  users_name: string
  users_identificationNumber: string
  users_login: string
  users_phoneNumber?: string
  users_statusID: number
  users_typeID: number
  addresses?: UsersAddressInfoType[]
}

interface UsersAddressInfoType {
  usersAddress_ID: number
  usersAddress_userID: number
  usersAddress_street: string
  usersAddress_houseNumber: string
  usersAddress_apartamentNumber?: string
  usersAddress_postCode: string
  usersAddress_city: string
  usersAddress_typeID: number
  usersAddress_communityID: number
}

export interface OfficialEditAddressInfoApplicationsVerifyMutationProps {
  isVerified: boolean
  reviewer: number
  addressApplications_ID: number
  userAddress_ID: number
}
export interface EditAddressInfoVerificationValues {
  isVerified: boolean
  addressApplications_ID: number
  user_ID: number
  userAddress_ID: number
}

export interface OfficialApplicationEditAddressProps {
  searchData: string
}

export interface NewDumpsterVerificationValues {
  isVerified: boolean
  dumpstersApplications_ID: number
  reviewer: number
  card_ID: number
  dumpster_ID: number
}

export interface OfficialApplicationAddDumpsterProps {
  searchData: string
}

export interface DumpsterData {
  dumpstersApplications_ID: number
  dumpstersApplications_cardID: number
  dumpstersApplications_cardNumber: string
  dumpstersApplications_typeID: number
  dumpstersApplications_dateAdded: string
  dumpstersApplications_dateReviewed?: string | null
  dumpstersApplications_dumpsterID: number
  dumpstersApplications_dumpsterName: string
  dumpstersApplications_reviewedBy?: number | null
  dumpstersApplications_statusID: number
  dumpstersApplications_userID: number
  dumpstersApplications_userName: string
}

export interface DeleteAddressInfoVerificationValues {
  isVerified: boolean
  addressApplications_ID: number
  userAddress_ID: number
}

export interface OfficialApplicationDeleteAddressProps {
  searchData: string
}

export interface AddressToDelete {
  addressApplications_ID: number
  addressApplications_addressID?: number | null
  addressApplications_apartamentNumber?: string | null
  addressApplications_typeID: number
  addressApplications_city: string
  addressApplications_communityID: number
  addressApplications_dateAdded: string
  addressApplications_dateReviewed?: string | null
  addressApplications_houseNumber: string
  addressApplications_postCode: string
  addressApplications_reviewedBy?: number | null
  addressApplications_statusID: number
  addressApplications_street: string
  addressApplications_addressTypeID: number
  addressApplications_userID: number
  user: {
    users_ID: number
    users_name: string
  }
}
