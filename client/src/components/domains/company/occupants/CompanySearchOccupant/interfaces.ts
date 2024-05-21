import { type ApolloQueryResult } from '@apollo/client'
import { type CurrentUserQuery } from '@/gql/userGraphs'

export interface FoundUser {
  users_ID: number
  users_login: string
  users_name: string
  users_identificationNumber: string
  users_phoneNumber?: string
  users_statusID: number
}

export interface SearchUserInfo {
  users_name?: string
  users_identificationNumber?: string
  users_login?: string
  users_phoneNumber?: string
}

export interface CompanySearchOccupantProps {
  occupants: FoundUser[]
  occupantsToAdd: FoundUser[]
  setOccupantsToAdd: React.Dispatch<React.SetStateAction<FoundUser[]>>
  refetch: (
    variables?: Partial<Record<string, any>> | undefined
  ) => Promise<ApolloQueryResult<CurrentUserQuery>>
}
