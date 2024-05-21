import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const OfficialDeleteUserMutation = objectType({
  name: 'OfficialDeleteUserMutation',
  definition() {},
})

export const OfficialDeleteUserMutationExtension = extendType({
  type: 'OfficialMutation',
  definition(t) {
    t.field('users', {
      type: 'OfficialDeleteUserMutation',
      resolve() {
        return true
      },
    })
  },
})

/**
 * Exports
 */
export * from './mutation.delete'
