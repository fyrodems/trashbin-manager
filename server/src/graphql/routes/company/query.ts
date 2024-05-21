import { extendType, objectType } from 'nexus'

export const CompanyQuery = objectType({
  name: 'CompanyQuery',
  definition() {},
})

/**
 * Add query `company` to base `Query` type
 */
export const CompanyQueryExtension = extendType({
  type: 'Query',
  definition(t) {
    t.field('company', {
      type: 'CompanyQuery',
      resolve() {
        return true
      },
    })
  },
})
