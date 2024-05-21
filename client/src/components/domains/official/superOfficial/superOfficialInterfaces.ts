import { type ApolloQueryResult } from '@apollo/client'
import { type CurrentUserQuery } from '@/gql/userGraphs'

export interface UserInfo {
  users_ID: number
  users_name: string
  users_identificationNumber: string
  users_login: string
  users_password: string
  users_phoneNumber?: string
  users_statusID: number
  users_typeID: number
  confirm: boolean
}

export interface SuperOfficialCreateOfficialProps {
  refetch: (
    variables?: Partial<Record<string, any>> | undefined
  ) => Promise<ApolloQueryResult<CurrentUserQuery>>
}

export interface DeleteOfficialValue {
  users_ID: number
  users_name: string
  refetch: (
    variables?: Partial<Record<string, any>> | undefined
  ) => Promise<ApolloQueryResult<CurrentUserQuery>>
}

export interface OfficialValues {
  users_ID: number
  users_login: string
  users_password?: string
  users_name: string
  users_identificationNumber: string
  users_phoneNumber?: string
}

export interface OfficialUpdateProps {
  open: boolean
  setOpen: (state: boolean) => void
  officialData: {
    users_ID: number
    users_login: string
    users_password?: string
    users_name: string
    users_identificationNumber: string
    users_phoneNumber?: string | null
  }
  refetch: (
    variables?: Partial<Record<string, any>> | undefined
  ) => Promise<ApolloQueryResult<CurrentUserQuery>>
}

export type OfficialInfoType = {
  users_ID: number
  users_name: string
  users_identificationNumber: string
  users_login: string
  users_phoneNumber?: string | null
  users_statusID: number
  users_typeID: number
  addresses: UsersAddressInfoType[]
} | null

interface UsersAddressInfoType {
  usersAddress_ID: number
  usersAddress_userID: number
  usersAddress_street: string
  usersAddress_houseNumber: string
  usersAddress_apartamentNumber?: string | null
  usersAddress_postCode: string
  usersAddress_city: string
  usersAddress_typeID: number
  usersAddress_communityID: number
}

export interface DataType {
  key: React.Key
  users_ID: number
  users_name: string
  users_login: string
  users_phoneNumber?: string | null
  users_statusID: number
  users_identificationNumber: string
  users_typeID: number
}
