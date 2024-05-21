import { type ApolloQueryResult } from '@apollo/client'
import { type CurrentUserQuery } from '@/gql/graphql'

export interface RateValues {
  rate_value: number
  rate_typeID: number
}

export interface RateUpdateProps {
  open: boolean
  setOpen: (state: boolean) => void
  refetch: (
    variables?: Partial<Record<string, any>> | undefined
  ) => Promise<ApolloQueryResult<CurrentUserQuery>>
  rateData: {
    rate_ID: number
    rate_value: number
    rate_typeID: number
  }
}
