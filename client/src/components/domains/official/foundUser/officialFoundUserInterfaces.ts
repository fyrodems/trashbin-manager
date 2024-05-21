import { type ApolloQueryResult } from '@apollo/client'
import { type CurrentUserQuery } from '@/gql/userGraphs'
import { type OfficialUserGetQuery } from '@/gql/graphql'

interface OfficialSelectedUserDataType {
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

export interface OfficialUserDetailsProps {
  userInfoData: OfficialSelectedUserDataType
  refetch: (
    variables?:
      | Partial<{
          props: {
            users_ID: number
          }
        }>
      | undefined
  ) => Promise<ApolloQueryResult<OfficialUserGetQuery>>
}

export interface DeleteUserValue {
  user_ID: number
  users_name: string
  users_statusID: number
  refetch: (
    variables?:
      | Partial<{
          props: {
            users_ID: number
          }
        }>
      | undefined
  ) => Promise<ApolloQueryResult<OfficialUserGetQuery>>
}

export interface CardInfo {
  usersCards_userID: number
  usersCards_statusID: number
  usersCards_number: string
  usersCards_numberPIN: string
}

export interface OfficialCreateCardFormProps {
  refetch: (
    variables?: Partial<Record<string, any>> | undefined
  ) => Promise<ApolloQueryResult<CurrentUserQuery>>
  userData: OfficialSelectedUserDataType
}

export interface OfficialCreateContractProps {
  refetch: (
    variables?: Partial<Record<string, any>> | undefined
  ) => Promise<ApolloQueryResult<CurrentUserQuery>>
  userData: OfficialSelectedUserDataType
}

export interface OfficialAddContractValues {
  usersContract_number: string
  usersContract_dateFrom: string
  usersContract_dateTo: string
  usersContract_ratePaper: number
  usersContract_ratePlastic: number
  usersContract_rateGlass: number
  usersContract_rateBio: number
  usersContract_rateMixed: number
}

export interface UserInfoUpdateProps {
  userInfoData: OfficialSelectedUserDataType
  refetch: (
    variables?: Partial<Record<string, any>> | undefined
  ) => Promise<ApolloQueryResult<CurrentUserQuery>>
}

export interface UserInfoUpdateValues {
  users_ID: number
  users_login: string
  users_phoneNumber?: string | null
  oldPassword?: string
  newPassword?: string
  users_name: string
  users_identificationNumber: string
  users_statusID: number
}

export interface AddressInfo {
  usersAddress_userID: number
  usersAddress_street: string
  usersAddress_houseNumber: string
  usersAddress_apartamentNumber?: string | null
  usersAddress_postCode: string
  usersAddress_city: string
  usersAddress_typeID: string
  usersAddress_communityID: number
}

export interface OfficialAddressInfoAddMutationProps {
  usersAddress_userID: number
  usersAddress_street: string
  usersAddress_houseNumber: string
  usersAddress_apartamentNumber?: string | null
  usersAddress_postCode: string
  usersAddress_city: string
  usersAddress_typeID: number
  usersAddress_communityID: number
}

export interface SelectOption {
  value: string
  label: string
}

export interface FormModalProps {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  isDisabled: boolean
  buttonContent: React.ReactNode
  popupTitle: string
  formNode: React.ReactNode
}

export interface OfficialCreateAddressFormProps {
  userData: OfficialSelectedUserDataType
  refetch: () => void
}

export interface SelectProps {
  type?: string
  name: string
  selectOptions: SelectOption[]
  placeholder: string
  updateState?: React.Dispatch<React.SetStateAction<string>>
  value?: string
}

export interface InputProps {
  name: string
  placeholder: string
  type: string
}

export interface FormProps {
  onSubmit: (values: AddressInfo) => void
  validate: (
    values: AddressInfo
  ) => Record<string, string> | Promise<Record<string, string>>
  children: (props: { handleSubmit: () => void }) => React.ReactNode
}

export interface OfficialCreateAddressFormValidationValues {
  usersAddress_street: string
  usersAddress_houseNumber: string
  usersAddress_postCode: string
  usersAddress_city: string
  usersAddress_typeID: string
  voivodeship: number
  municipality: number
  usersAddress_communityID: number
}

export interface OfficialCreateContractValidationValues {
  usersContract_number: string
  usersContract_dateFrom: string
  usersContract_dateTo: string
}
