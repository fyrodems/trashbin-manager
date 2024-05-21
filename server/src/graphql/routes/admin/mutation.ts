import { extendType, objectType } from 'nexus'

export const AdminMutation = objectType({
  name: 'AdminMutation',
  definition() {},
})

/**
 * Add query `user` to base `Query` type
 */
export const AdminMutationExtension = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('admin', {
      type: AdminMutation,
      resolve() {
        return true
      },
    })
  },
})
