import { type ApolloQueryResult } from '@apollo/client'
import { type CurrentUserQuery } from '@/gql/graphql'

export interface CompanyDumpsterContractsCollapseProps {
  contracts: DumpsterContract[]
  refetch: (
    variables?: Partial<Record<string, any>> | undefined
  ) => Promise<ApolloQueryResult<CurrentUserQuery>>
}

export interface ContractActionsProps {
  contract: DumpsterContract[]
}

export interface DumpsterContract {
  dumpsterContract_ID: number
  dumpsterContract_number: string
  dumpsterContract_dumpsterID: number
  dumpsterContract_dateFrom: string
  dumpsterContract_dateTo: string
  dumpsterContract_statusID: number
  dumpsterContract_communityID: number
  rates: DumpsterRate[]
}

export interface DumpsterRate {
  rate_ID: number
  rate_value: number
  rate_dumpsterContractID: number
  rate_garbageTypeID: number
  rate_statusID: number
  rate_userContractID: number
}
