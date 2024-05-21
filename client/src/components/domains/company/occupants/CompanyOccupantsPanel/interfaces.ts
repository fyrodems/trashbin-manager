import { type ApolloQueryResult } from '@apollo/client'
import { type CurrentUserQuery } from '@/gql/graphql'

export interface OfficialUserOccupantSearchType {
  users_ID: number
  users_login: string
  users_name: string
  users_identificationNumber: string
  users_phoneNumber?: string
  users_statusID: number
  connection_ID?: number
}

export interface DataType {
  users_key: React.Key
  users_ID: number
  users_name: string
  users_login: string
  users_phoneNumber: string
  users_statusID: number
  connection_ID: number
}

export interface CompanyOccupantsPanelProps {
  occupants: OfficialUserOccupantSearchType[]
  refetch: (
    variables?: Partial<Record<string, any>> | undefined
  ) => Promise<ApolloQueryResult<CurrentUserQuery>>
}
