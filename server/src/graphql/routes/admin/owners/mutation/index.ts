import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const AdminOwnersMutation = objectType({
  name: 'AdminOwnersMutation',
  definition() {},
})

export const AdminOwnersMutationExtension = extendType({
  type: 'AdminMutation',
  definition(t) {
    t.field('owners', {
      type: 'AdminOwnersMutation',
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
