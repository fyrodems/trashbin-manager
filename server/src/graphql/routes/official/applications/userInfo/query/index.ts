import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const OfficialApplicationsUserInfoQuery = objectType({
  name: 'OfficialApplicationsUserInfoQuery',
  definition() {},
})

export const OfficialApplicationsUserInfoQueryExtension = extendType({
  type: 'OfficialApplicationsQuery',
  definition(t) {
    t.field('userInfo', {
      type: 'OfficialApplicationsUserInfoQuery',
      resolve() {
        return true
      },
    })
  },
})

/**
 * Exports
 */
export * from './query.get'
