import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const OfficialApplicationsNewUsersQuery = objectType({
  name: 'OfficialApplicationsNewUsersQuery',
  definition() {},
})

export const OfficialApplicationsNewUsersQueryExtension = extendType({
  type: 'OfficialApplicationsQuery',
  definition(t) {
    t.field('newUser', {
      type: 'OfficialApplicationsNewUsersQuery',
      resolve() {
        return true
      },
    })
  },
})

export * from './query.get'
