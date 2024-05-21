import { type Maybe } from '../graphql'
import {
  type DumpsterInfoType,
  type MutationResponseType,
  type DumpsterBinType,
  type NewAddressType,
  type NewCardType,
  type NewDumpsterApplicationType,
  type UserInfoType,
  type ApplicationArchiveType,
  type PersonalDataApplicationsType,
  type UserFullDataType,
} from '../commonTypes'

export * from './userInfo.query'
export * from './selectedUserData.query'

export * from './contracts/contracts.mutation.add'
export * from './contracts/contracts.mutation.delete'
export * from './contracts/contracts.mutation.edit'
export * from './info.mutation.edit'
export * from './selectedUser.mutation.delete'
export * from './cards'
export * from './addressInfo'
export * from './applications'
export * from './dumpsters'
export * from './contracts'
export * from './rates'
export * from './bins'
export * from './superOfficial'
export * from './applicationsArchive'
export * from './createUser'
export * from './usersContracts'

// QUERIES
export interface OfficialQuery {
  __typename?: 'OfficialQuery'
  users: Maybe<OfficialUserInfoQuery>
  user: Maybe<OfficialSelectedUserDataQuery>
  applications: Maybe<OfficialApplicationsQuery>
  dumpsters: Maybe<OfficialDumpstersQuery>
  bins: Maybe<OfficialBinsQuery>
  officials: Maybe<SuperOfficialOfficialsQuery>
}

export interface OfficialUserInfoQuery {
  __typename?: 'OfficialUserInfoQuery'
  get: OfficialUserInfoGetQueryResult[]
}

export interface OfficialUserInfoGetQueryResult {
  __typename?: 'OfficialUserInfoGetQueryResult'
  result: UserFullDataType
}

export interface OfficialSelectedUserDataQuery {
  __typename?: 'OfficialSelectedUserDataQuery'
  get: OfficialUserInfoGetQueryResult[]
}

export interface OfficialDumpstersQuery {
  __typename?: 'OfficialDumpstersQuery'
  get: DumpsterInfoType[]
}

export interface OfficialApplicationsQuery {
  __typename?: 'OfficialApplicationsQuery'
  newUser: OfficialNewUserApplicationsQuery[]
  cards: OfficialCardsApplicationsQuery[]
  addressInfo: OfficialAddressInfoApplicationsQuery[]
  dumpsters: OfficialDumpstersApplicationsQuery[]
  userInfo: OfficialUserInfoApplicationsQuery[]
  archive: OfficialApplicationsArchiveQuery[]
}

export interface OfficialNewUserApplicationsQuery {
  __typename?: 'OfficialNewUserApplicationsQuery'
  get: UserInfoType[]
}

export interface OfficialApplicationsArchiveQuery {
  __typename?: 'OfficialApplicationsArchiveQuery'
  get: ApplicationArchiveType
}

export interface OfficialCardsApplicationsQuery {
  __typename?: 'OfficialCardsApplicationsQuery'
  get: NewCardType[]
}

export interface OfficialAddressInfoApplicationsQuery {
  __typename?: 'OfficialAddressInfoApplicationsQuery'
  get: NewAddressType[]
}

export interface OfficialDumpstersApplicationsQuery {
  __typename?: 'OfficialDumpstersApplicationsQuery'
  get: NewDumpsterApplicationType[]
}

export interface OfficialUserInfoApplicationsQuery {
  __typename?: 'OfficialUserInfoApplicationsQuery'
  get: PersonalDataApplicationsType[]
}

export interface OfficialSelectedUserDataQueryResult {
  __typename?: 'OfficialSelectedUserDataQueryResult'
  result: UserInfoType[]
}

export interface OfficialBinsQuery {
  __typename?: 'OfficialBinsQuery'
  get: DumpsterBinType
}

export interface SuperOfficialOfficialsQuery {
  __typename?: 'SuperOfficialOfficialsQuery'
  get: UserInfoType[]
}

// MUTATIONS
export interface OfficialMutation {
  __typename?: 'OfficialMutation'
  cards?: Maybe<OfficialCardsMutation>
  contracts?: Maybe<OfficialContractsMutation>
  info?: Maybe<OfficialUserInfoMutation>
  dumpsters?: Maybe<OfficialUserInfoMutation>
  users?: Maybe<OfficialUsersMutation>
  address?: Maybe<OfficialAddressInfoMutation>
  applications?: Maybe<OfficialApplicationsMutation>
  rates?: Maybe<OfficialRatesMutation>
  officials?: Maybe<SuperOfficialOfficialsMutation>
  createUser?: Maybe<OfficialCreateUserMutation>
  userContracts?: Maybe<OfficialUserContractsMutation>
}

export interface OfficialCardsMutation {
  __typename?: 'OfficialCardsMutation'
  add?: MutationResponseType
  delete?: MutationResponseType
  edit?: MutationResponseType
}

export interface OfficialContractsMutation {
  __typename?: 'OfficialContractsMutation'
  add?: MutationResponseType
  delete?: MutationResponseType
  edit?: MutationResponseType
  archivize?: MutationResponseType
}

export interface OfficialUserContractsMutation {
  __typename?: 'OfficialUserContractsMutation'
  add?: MutationResponseType
  edit?: MutationResponseType
  archivize?: MutationResponseType
}

export interface OfficialUserInfoMutation {
  __typename?: 'OfficialUserInfoMutation'
  edit?: MutationResponseType
}

export interface OfficialDumpstersMutation {
  __typename?: 'OfficialDumpstersMutation'
  edit?: MutationResponseType
}

export interface OfficialUsersMutation {
  __typename?: 'OfficialUsersMutation'
  delete?: MutationResponseType
}

export interface OfficialAddressInfoMutation {
  __typename?: 'OfficialAddressInfoMutation'
  edit?: MutationResponseType
  add?: MutationResponseType
  delete?: MutationResponseType
}

export interface OfficialRatesMutation {
  __typename?: 'OfficialRatesMutation'
  edit?: MutationResponseType
  add?: MutationResponseType
  delete?: MutationResponseType
}

export interface SuperOfficialOfficialsMutation {
  __typename?: 'SuperOfficialOfficialsMutation'
  add?: MutationResponseType
  delete?: MutationResponseType
  edit?: MutationResponseType
  restore?: MutationResponseType
}

export interface OfficialApplicationsMutation {
  __typename?: 'OfficialApplicationsMutation'
  newUser?: Maybe<OfficialNewUserApplicationMutation>
  cards?: Maybe<OfficialCardsApplicationsMutation>
  addressInfo?: Maybe<OfficialAddressInfoApplicationsMutation>
  dumpsters?: Maybe<OfficialDumpstersApplicationsMutation>
  userInfo?: Maybe<OfficialUserInfoApplicationsMutation>
}

export interface OfficialNewUserApplicationMutation {
  __typename?: 'OfficialNewUserApplicationMutation'
  verify?: MutationResponseType
}

export interface OfficialCardsApplicationsMutation {
  __typename?: 'OfficialCardsApplicationsMutation'
  verify?: MutationResponseType
}

export interface OfficialAddressInfoApplicationsMutation {
  __typename?: 'OfficialAddressInfoApplicationsMutation'
  verifyAdd?: MutationResponseType
  verifyDelete?: MutationResponseType
  verifyEdit?: MutationResponseType
}

export interface OfficialDumpstersApplicationsMutation {
  __typename?: 'OfficialDumpstersApplicationsMutation'
  verifyAdd?: MutationResponseType
}

export interface OfficialUserInfoApplicationsMutation {
  __typename?: 'OfficialUserInfoApplicationsMutation'
  verifyEdit?: MutationResponseType
}

export interface OfficialCreateUserMutation {
  __typename?: 'OfficialCreateUserMutation'
  add?: MutationResponseType
}
