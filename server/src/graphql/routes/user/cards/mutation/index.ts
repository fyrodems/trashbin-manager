import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const UserCardsMutation = objectType({
  name: 'UserCardsMutation',
  definition() {},
})

export const UserCardsMutationExtension = extendType({
  type: 'UserMutation',
  definition(t) {
    t.field('cards', {
      type: 'UserCardsMutation',
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
export * from './mutation.delete'
