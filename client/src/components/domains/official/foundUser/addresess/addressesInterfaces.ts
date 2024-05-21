import { type ApolloQueryResult } from '@apollo/client'
import { type CurrentUserQuery } from '@/gql/userGraphs'

export interface DeleteAddressInfoValue {
  usersAddress_ID: number
  usersAddress_userID: number
  refetch: (
    variables?: Partial<Record<string, any>> | undefined
  ) => Promise<ApolloQueryResult<CurrentUserQuery>>
}

export interface AddressInfoValues {
  usersAddress_ID: number
  usersAddress_street: string
  usersAddress_houseNumber: string
  usersAddress_apartamentNumber?: string | null
  usersAddress_postCode: string
  usersAddress_city: string
  usersAddress_typeID: number
  usersAddress_communityID: number
}

export interface AddressInfoInitialValues {
  usersAddress_ID?: number
  usersAddress_street: string
  usersAddress_houseNumber: string
  usersAddress_apartamentNumber?: string | null
  usersAddress_postCode: string
  usersAddress_city: string
  usersAddress_typeID?: number
  usersAddress_communityID?: number
}

export interface OfficialSelectedUserDataType {
  userType: number
  basicInfo: {
    users_name: string
    users_identificationNumber: string
    users_login: string
    users_phoneNumber?: string | null
    users_ID: number
    users_statusID: number
  }
  cards: Array<{
    usersCards_statusID: number
    usersCards_ID: number
    usersCards_number: string
    usersCards_numberPIN?: string | null
    dumpsters: Array<{
      dumpster_name: string
      dumpster_city: string
      dumpster_street: string
      dumpster_houseNumbers: string
      dumpster_ID: number
    } | null>
  } | null>
  addressInfo: Array<{
    usersAddress_typeID: number
    usersAddress_ID: number
    usersAddress_street: string
    usersAddress_houseNumber: string
    usersAddress_apartamentNumber?: string | null
    usersAddress_postCode: string
    usersAddress_city: string
    usersAddress_communityID: number
  } | null>
  contracts?: {
    userContracts?: Array<{
      usersContract_ID: number
      usersContract_userID: number
      usersContract_number: string
      usersContract_dateFrom: string
      usersContract_dateTo: string
      usersContract_statusID: number
      usersContract_communityID: number
      rates?: {
        paper?: number | null
        plastic?: number | null
        glass?: number | null
        bio?: number | null
        mixed?: number | null
      } | null
    }> | null
    housingAssociationContracts?: Array<{
      dumpsterContract_ID: number
      dumpsterContract_number: string
      dumpsterContract_dumpsterID: number
      dumpsterContract_dateFrom: string
      dumpsterContract_dateTo: string
      dumpsterContract_statusID: number
      dumpsterContract_communityID: number
      rates?: {
        paper?: number | null
        plastic?: number | null
        glass?: number | null
        bio?: number | null
        mixed?: number | null
      } | null
    }> | null
  } | null
}

export interface OfficialPanelAddressProps {
  userInfoData: OfficialSelectedUserDataType
  refetch: (
    variables?: Partial<Record<string, any>> | undefined
  ) => Promise<ApolloQueryResult<CurrentUserQuery>>
}

export interface OfficialEditAddressFormProps {
  onSubmit: (values: AddressInfoValues) => void
  initialValues: AddressInfoInitialValues
  address: AddressInfoValues
  isModalOpen: boolean
  setIsModalOpen: (state: boolean) => void
}

export interface ValidateEditAddressFormValues {
  voivodeship: number
  municipality: number
  usersAddress_communityID: number
  usersAddress_postCode: string
  usersAddress_city: string
  usersAddress_street: string
  usersAddress_houseNumber: string
}
