import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const UserDumpstersMutation = objectType({
  name: 'UserDumpstersMutation',
  definition() {},
})

export const UserDumpstersMutationExtension = extendType({
  type: 'UserMutation',
  definition(t) {
    t.field('dumpsters', {
      type: 'UserDumpstersMutation',
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
