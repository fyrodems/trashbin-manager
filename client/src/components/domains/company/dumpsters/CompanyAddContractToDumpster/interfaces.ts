import { type ApolloQueryResult } from '@apollo/client'
import { type CurrentUserQuery } from '@/gql/userGraphs'

export interface ContractsInfo {
  dumpsterContract_number: string
  dumpsterContract_dumpsterID: number
  dumpsterContract_dateFrom: string
  dumpsterContract_dateTo: string
  dumpsterContract_statusID: number
  dumpsterContract_communityID: number
}

export interface DumpsterInfo {
  dumpster_ID: number
  dumpster_name: string
  dumpster_description?: string
  dumpster_street: string
  dumpster_city: string
  dumpster_postCode: string
  dumpster_communityID: number
  dumpster_houseNumbers: string
  dumpster_hasError: boolean
}

export interface CompanyAddContractToDumpsterProps {
  dumpster: DumpsterInfo
  refetch: (
    variables?: Partial<Record<string, any>> | undefined
  ) => Promise<ApolloQueryResult<CurrentUserQuery>>
}
