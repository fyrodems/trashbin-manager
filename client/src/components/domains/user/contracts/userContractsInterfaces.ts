export interface UserContractsProps {
  userContractsData: {
    housingAssociation?: HousingAssociation[] | null
    userContracts?: UserContractsInterface[] | null
  }
}

export type UserContractsInterface =
  | {
      rates?: {
        bio?: number | null
        glass?: number | null
        mixed?: number | null
        paper?: number | null
        plastic?: number | null
      } | null
      usersContract_ID?: number
      usersContract_communityID?: number
      usersContract_dateFrom?: string
      usersContract_dateTo?: string
      usersContract_dumpsterID?: number
      usersContract_number?: string
      usersContract_statusID?: number
    }
  | null
  | undefined

export type HousingAssociation =
  | {
      dumpsterContract_ID?: number
      dumpsterContract_communityID?: number
      dumpsterContract_dateFrom?: string
      dumpsterContract_dateTo?: string
      dumpsterContract_dumpsterID?: number
      dumpsterContract_number?: string
      dumpsterContract_statusID?: number
      rates?: {
        bio?: number | null
        glass?: number | null
        mixed?: number | null
        paper?: number | null
        plastic?: number | null
      } | null
    }
  | null
  | undefined

export interface DumpsterContractType {
  dumpsterContract_ID?: number
  dumpsterContract_communityID?: number
  dumpsterContract_dateFrom?: string
  dumpsterContract_dateTo?: string
  dumpsterContract_dumpsterID?: number
  dumpsterContract_number?: string
  dumpsterContract_statusID?: number
  rates?: {
    bio?: number | null
    glass?: number | null
    mixed?: number | null
    paper?: number | null
    plastic?: number | null
  } | null
  usersContract_ID?: number
  usersContract_communityID?: number
  usersContract_dateFrom?: string
  usersContract_dateTo?: string
  usersContract_dumpsterID?: number
  usersContract_number?: string
  usersContract_statusID?: number
}
