import { type Maybe, type Scalars } from '../graphql'
import {
  type MutationResponseType,
  type GarbageEntryType,
  type UsersApplicationsType,
  type UsersCardsType,
  type UsersAddressInfoType,
  type UserInfoMutation,
  type UserFullDataType,
  type UserContractType,
} from '../commonTypes'

export * from './cards.query'
export * from './contracts.query'
export * from './dumpsters.query'
export * from './garbages.query'
export * from './userInfo.query'
export * from './addressInfo.query'
export * from './applications.query'
export * from './addressInfo.mutation.add'
export * from './addressInfo.mutation.delete'
export * from './addressInfo.mutation.edit'
export * from './contracts.mutation.add'
export * from './userInfo.mutation'
export * from './cards.mutation.add'
export * from './cards.mutation.delete'
export * from './dumpsters.mutation.add'
export * from './dumpsters.mutation.delete'
export * from './application.mutation.cancel'

// QUERIES
export interface UserQuery {
  __typename?: 'UserQuery'
  garbage?: Maybe<UserGarbageQuery>
  info?: Maybe<UserInfoQuery>
  card?: Maybe<UserCardQuery>
  addressInfo?: Maybe<UserAddressInfoQuery>
  applications?: Maybe<UserApplicationsQuery>
  contracts?: Maybe<UserContractsQuery>
}

export interface UserGarbageQuery {
  __typename?: 'UserGarbageQuery'
  get: GarbageEntryType[]
}

export interface UserInfoQuery {
  __typename?: 'UserInfoQuery'
  get?: Maybe<UserFullDataType>
  verification?: Maybe<Scalars['Int']>
}

export interface UserCardQuery {
  __typename?: 'UserCardQuery'
  get?: Maybe<UsersCardsType>
}

export interface UserAddressInfoQuery {
  __typename?: 'UserAddressInfoQuery'
  get?: Maybe<UsersAddressInfoType>
}

export interface UserApplicationsQuery {
  __typename?: 'UserApplicationsQuery'
  get?: Maybe<UsersApplicationsType>
}

export interface UserContractsQuery {
  __typename?: 'UserContractsQuery'
  get?: Maybe<UserContractType>
}

// MUTATIONS
export interface UserMutation {
  __typename?: 'UserMutation'
  info?: Maybe<UserInfoMutation>
  cards?: Maybe<UserCardsMutation>
  dumpsters?: Maybe<UserDumpstersMutation>
  addressInfo?: Maybe<UserAddressInfoMutation>
  applications?: Maybe<UserApplicationsMutation>
  contracts?: Maybe<UserContractsMutation>
}

export interface UserCardsMutation {
  __typename?: 'UserCardsMutation'
  add?: MutationResponseType
  delete?: MutationResponseType
}

export interface UserDumpstersMutation {
  __typename?: 'UserDumpstersMutation'
  add?: MutationResponseType
  delete?: MutationResponseType
}

export interface UserAddressInfoMutation {
  __typename?: 'UserAddressInfoMutation'
  add?: MutationResponseType
  delete?: MutationResponseType
  edit?: MutationResponseType
}

export interface UserApplicationsMutation {
  __typename?: 'UserApplicationsMutation'
  cancel?: MutationResponseType
}

export interface UserContractsMutation {
  __typename?: 'UserContractsMutation'
  add?: MutationResponseType
}
