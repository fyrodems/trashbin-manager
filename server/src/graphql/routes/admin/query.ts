import { extendType, objectType } from 'nexus'

export const AdminQuery = objectType({
  name: 'AdminQuery',
  definition() {},
})

/**
 * Add query `admin` to base `Query` type
 */
export const AdminQueryExtension = extendType({
  type: 'Query',
  definition(t) {
    t.field('admin', {
      type: 'AdminQuery',
      resolve() {
        return true
      },
    })
  },
})
