import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const OfficialCreateUserMutation = objectType({
  name: 'OfficialCreateUserMutation',
  definition() {},
})

export const OfficialCreateUserMutationExtension = extendType({
  type: 'OfficialMutation',
  definition(t) {
    t.field('createUser', {
      type: 'OfficialCreateUserMutation',
      resolve() {
        return true
      },
    })
  },
})

/**
 * Exports
 */
export * from './mutation.add'
