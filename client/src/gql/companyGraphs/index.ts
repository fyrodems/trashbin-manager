import {
  type CardsBulkOrderType,
  type DumpsterInfoType,
  type MutationResponseType,
  type OfficialUserSearchType,
  type UsersAddressInfoType,
  type CompanyGarbageType,
} from '../commonTypes'
import { type Maybe } from '../graphql'

export * from './dumpsters'
export * from './applications'
export * from './addresses'
export * from './cardsRent'
export * from './info'
export * from './garbage'
export * from './houseAssociationsOccupants'

// QUERIES
export interface CompanyQuery {
  __typename?: 'CompanyQuery'
  dumpsters: Maybe<CompanyDumpstersQuery>
  occupants: Maybe<CompanyOccupantsQuery>
  addresses: Maybe<CompanyAddressQuery>
  cards: Maybe<CompanyCardsOrdersQuery>
  garbage: Maybe<CompanyGarbageQuery>
}

export interface CompanyDumpstersQuery {
  __typename?: 'CompanyDumpstersQuery'
  get: DumpsterInfoType[]
}

export interface CompanyOccupantsQuery {
  __typename?: 'CompanyOccupantsQuery'
  get: OfficialUserSearchType[]
}

export interface CompanyAddressQuery {
  __typename?: 'CompanyAddressQuery'
  get: UsersAddressInfoType[]
}

export interface CompanyCardsOrdersQuery {
  __typename?: 'CompanyCardsOrdersQuery'
  get: CardsBulkOrderType[]
}

export interface CompanyGarbageQuery {
  __typename?: 'CompanyGarbageQuery'
  get: CompanyGarbageType[]
}

// MUTATIONS
export interface CompanyMutation {
  __typename?: 'CompanyMutation'
  cards?: Maybe<CompanyCardsMutation>
  dumpsters?: Maybe<CompanyDumpstersMutation>
  occupants?: Maybe<CompanyOccupantsMutation>
  addresses?: Maybe<CompanyAddressMutation>
  cardsRent?: Maybe<CompanyCardsRentMutation>
  info?: Maybe<CompanyProfileMutation>
}

export interface CompanyCardsMutation {
  __typename?: 'CompanyCardsMutation'
  add?: MutationResponseType
}

export interface CompanyDumpstersMutation {
  __typename?: 'CompanyDumpstersMutation'
  add?: MutationResponseType
}

export interface CompanyOccupantsMutation {
  __typename?: 'CompanyOccupantsMutation'
  add?: MutationResponseType
  delete?: MutationResponseType
}

export interface CompanyAddressMutation {
  __typename?: 'CompanyAddressMutation'
  add?: MutationResponseType
  delete?: MutationResponseType
  edit?: MutationResponseType
}

export interface CompanyCardsRentMutation {
  __typename?: 'CompanyCardsRentMutation'
  add?: MutationResponseType
  delete?: MutationResponseType
}

export interface CompanyProfileMutation {
  __typename?: 'CompanyProfileMutation'
  profile?: MutationResponseType
  pin?: MutationResponseType
}
