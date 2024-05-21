import { extendType, objectType } from 'nexus'

export const UserQuery = objectType({
  name: 'UserQuery',
  definition() {},
})

/**
 * Add query `user` to base `Query` type
 */
export const UserQueryExtension = extendType({
  type: 'Query',
  definition(t) {
    t.field('user', {
      type: 'UserQuery',
      resolve() {
        return true
      },
    })
  },
})
