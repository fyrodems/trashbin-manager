import { extendType, objectType } from 'nexus'

export const UserMutation = objectType({
  name: 'UserMutation',
  definition() {},
})

/**
 * Add query `user` to base `Query` type
 */
export const UserMutationExtension = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('user', {
      type: 'UserMutation',
      resolve() {
        return true
      },
    })
  },
})
