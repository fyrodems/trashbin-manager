import { type ApolloQueryResult } from '@apollo/client'
import { type Exact, type CurrentUser1Query } from '@/gql/graphql'

export interface CardsInfo {
  userID: number
  numOfCards: number
}

export interface DataType {
  key: React.Key
  status: number
  orderDate: string
  numOfCards: number
}

export interface CompanyCardsType {
  cardsBulkOrder_ID: number
  cardsBulkOrder_statusID: number
  cardsBulkOrder_orderDate: string
  cardsBulkOrder_numOfCards: number
}

export interface HousingAssociationOperationsProps {
  cardID: number
  userID: number
  refetchUserData: (
    variables?: Partial<Exact<Record<string, never>>> | undefined
  ) => Promise<ApolloQueryResult<CurrentUser1Query>>
}
