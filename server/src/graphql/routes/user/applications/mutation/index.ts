import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const UserApplicationsMutation = objectType({
  name: 'UserApplicationsMutation',
  definition() {},
})

export const UserDApplicationsutationExtension = extendType({
  type: 'UserMutation',
  definition(t) {
    t.field('applications', {
      type: 'UserApplicationsMutation',
      resolve() {
        return true
      },
    })
  },
})

/**
 * Exports
 */
export * from './mutation.cancel'
