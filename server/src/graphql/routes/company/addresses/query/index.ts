import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const CompanyAddressQuery = objectType({
  name: 'CompanyAddressQuery',
  definition() {},
})

export const CompanyAddressQueryExtension = extendType({
  type: 'CompanyQuery',
  definition(t) {
    t.field('addresses', {
      type: 'CompanyAddressQuery',
      resolve() {
        return true
      },
    })
  },
})

export * from './query.get'
