import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const OfficialUserInfoQuery = objectType({
  name: 'OfficialUserInfoQuery',
  definition() {},
})

export const OfficialUserInfoQueryExtension = extendType({
  type: 'OfficialQuery',
  definition(t) {
    t.field('users', {
      type: 'OfficialUserInfoQuery',
      resolve() {
        return true
      },
    })
  },
})

export * from './query.get'
