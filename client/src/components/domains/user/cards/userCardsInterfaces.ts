import { type ApolloQueryResult } from '@apollo/client'
import { type Exact, type CurrentUser1Query } from '@/gql/graphql'

export interface DumpsterFormProps {
  dumpstersIDs: number[]
  usersCards_ID?: number
  user_ID: number
  cardNumber: string
  users_communities: number[]
  userType?: number
  refetchUserData: (
    variables?: Partial<Exact<Record<string, never>>> | undefined
  ) => Promise<ApolloQueryResult<CurrentUser1Query>>
}

export interface DumpstersInfo {
  card_ID: number
  dumpster_ID: number
  user_ID: number
}

export interface CardInfo {
  usersCards_userID: number
  usersCards_numberPIN: string
  dumpstersIDs: number[]
}

export interface UserCreateCardFormProps {
  userID: number
  users_communities: number[]
}

export interface DeleteCardValue {
  usersCards_ID: number
  cardNumber: string
  refetch: (
    variables?: Partial<Exact<Record<string, never>>> | undefined
  ) => Promise<ApolloQueryResult<CurrentUser1Query>>
}

export interface DeleteDumpsterValue {
  card_ID: number
  dumpster_ID: number
  cardNumber: string
  dumpsterNumber: string
  refetch: (
    variables?: Partial<Exact<Record<string, never>>> | undefined
  ) => Promise<ApolloQueryResult<CurrentUser1Query>>
}

export interface OfficialUserInfoType {
  userData?: {
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
  refetch: (
    variables?: Partial<Exact<Record<string, never>>> | undefined
  ) => Promise<ApolloQueryResult<CurrentUser1Query>>
}
