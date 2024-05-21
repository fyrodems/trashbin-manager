import { type ApolloQueryResult } from '@apollo/client'
import { type CurrentUserQuery } from '@/gql/graphql'

export interface OfficialDumpsterContractsRatesProps {
  rates: Array<{
    rate_ID: number
    rate_typeID: number
    rate_value: number
  }>
  refetch: (
    variables?: Partial<Record<string, any>> | undefined
  ) => Promise<ApolloQueryResult<CurrentUserQuery>>
}
