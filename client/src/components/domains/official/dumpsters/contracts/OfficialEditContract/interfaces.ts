import { type ApolloQueryResult } from '@apollo/client'
import { type CurrentUserQuery } from '@/gql/graphql'

export interface ContractValues {
  dumpsterContract_ID: number
  dumpsterContract_dateFrom: string
  dumpsterContract_dateTo: string
  dumpsterContract_statusID: number
  dumpsterContract_dumpsterID: number
}

export interface ContractUpdateProps {
  open: boolean
  setOpen: (state: boolean) => void
  contractData: {
    dumpsterContract_ID: number
    dumpsterContract_dateFrom: string
    dumpsterContract_dateTo: string
    dumpsterContract_statusID: number
    dumpsterContract_dumpsterID: number
  }
}

export interface OfficialEditContractProps {
  contractData: DumpsterContract[]
  refetch: (
    variables?: Partial<Record<string, any>> | undefined
  ) => Promise<ApolloQueryResult<CurrentUserQuery>>
}

export interface DumpsterContract {
  dumpsterContract_ID: number
  dumpsterContract_number?: string
  dumpsterContract_dumpsterID: number
  dumpsterContract_dateFrom: string
  dumpsterContract_dateTo: string
  dumpsterContract_statusID: number
  dumpsterContract_communityID?: number
}
