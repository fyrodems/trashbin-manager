import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const UserApplicationsQuery = objectType({
  name: 'UserApplicationsQuery',
  definition() {},
})

export const UserApplicationsExtension = extendType({
  type: 'UserQuery',
  definition(t) {
    t.field('applications', {
      type: 'UserApplicationsQuery',
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
