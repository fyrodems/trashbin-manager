import { type Maybe } from '../graphql'
import {
  type CommonUserInfoType,
  type CommonDumpstersInfoType,
} from '../commonTypes'

// eslint-disable-next-line import/no-cycle
export * from './common.dumpsters.query'
// QUERIES
export interface CommonQuery {
  __typename?: 'CommonQuery'
  dumpsters: Maybe<CommonDumpstersQuery>
  users: Maybe<CommonUserQuery>
}

export interface CommonDumpstersQuery {
  __typename?: 'CommonDumpstersQuery'
  get: CommonDumpstersInfoType[]
}
export interface CommonUserQuery {
  __typename?: 'CommonUserQuery'
  get: CommonUserInfoType
}
