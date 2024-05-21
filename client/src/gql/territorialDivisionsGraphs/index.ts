import { type Maybe } from '../graphql'
import {
  type CommunityInfoType,
  type TerritorialDivisionFullDataType,
  type MunicipalityInfoType,
  type VoivodeshipInfoType,
} from '../commonTypes'

// eslint-disable-next-line import/no-cycle
export * from './communities.query'
export * from './municipalities.query'
export * from './voivodeships.query'
export * from './fullData.query'

// QUERIES
export interface TerritorialDivisionQuery {
  __typename?: 'TerritorialDivisionQuery'
  communities?: Maybe<UserCommunitiesQuery>
  muicipalities?: Maybe<UserMunicipalitiesQuery>
  voivodeships?: Maybe<UserVoivodeshipsQuery>
  fullData?: Maybe<TerritorialDivisionsFullDataQuery>
}

export interface UserCommunitiesQuery {
  __typename?: 'UserCommunitiesQuery'
  get: CommunityInfoType[]
}

export interface UserMunicipalitiesQuery {
  __typename?: 'UserMunicipalitiesQuery'
  get?: Maybe<MunicipalityInfoType>
}

export interface UserVoivodeshipsQuery {
  __typename?: 'UserVoivodeshipsQuery'
  get?: Maybe<VoivodeshipInfoType>
}

export interface TerritorialDivisionsFullDataQuery {
  __typename?: 'TerritorialDivisionsFullDataQuery'
  get?: Maybe<TerritorialDivisionFullDataType>
}
