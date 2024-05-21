import { extendType, objectType } from 'nexus'

export const OfficialQuery = objectType({
  name: 'OfficialQuery',
  definition() {},
})

/**
 * Add query `official` to base `Query` type
 */
export const OfficialQueryExtension = extendType({
  type: 'Query',
  definition(t) {
    t.field('official', {
      type: 'OfficialQuery',
      resolve() {
        return true
      },
    })
  },
})
