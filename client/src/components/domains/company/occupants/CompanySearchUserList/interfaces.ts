import { type ApolloQueryResult } from '@apollo/client'
import { type CurrentUserQuery } from '@/gql/userGraphs'

interface FoundUser {
  users_ID: number
  users_name: string
  users_login: string
  users_phoneNumber?: string
  users_statusID: number
  users_identificationNumber: string
}

export interface FoundUsersListProps {
  findUserLoading: boolean
  usersList: FoundUser[]
  occupantsToAdd: FoundUser[]
  setOccupantsToAdd: React.Dispatch<React.SetStateAction<FoundUser[]>>
  refetch: (
    variables?: Partial<Record<string, any>> | undefined
  ) => Promise<ApolloQueryResult<CurrentUserQuery>>
}

export interface DataType {
  key: React.Key
  ID: number
  name: string
  login: string
  phoneNumber?: string
  statusID: number
}
