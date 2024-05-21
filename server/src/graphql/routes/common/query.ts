import { objectType, extendType } from 'nexus'

export const CommonQuery = objectType({
  name: 'CommonQuery',
  definition() {},
})

/**
 * Add query `official` to base `Query` type
 */
export const CommonQueryExtension = extendType({
  type: 'Query',
  definition(t) {
    t.field('common', {
      type: 'CommonQuery',
      resolve() {
        return true
      },
    })
  },
})
