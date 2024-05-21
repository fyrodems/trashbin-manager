import { type ApolloQueryResult } from '@apollo/client'
import { type CurrentUserQuery } from '@/gql/graphql'

export interface CompanyAddRateProps {
  contractID: number
  rates: DumpsterRate[]
  refetch: (
    variables?: Partial<Record<string, any>> | undefined
  ) => Promise<ApolloQueryResult<CurrentUserQuery>>
}

export interface DumpsterRate {
  rate_ID: number
  rate_value: number
  rate_dumpsterContractID: number
  rate_typeID: number
  rate_statusID: number
  rate_userContractID: number
}
