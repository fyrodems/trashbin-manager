import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const CompanyAddressMutation = objectType({
  name: 'CompanyAddressMutation',
  definition() {},
})

export const CompanyAddressMutationExtension = extendType({
  type: 'CompanyMutation',
  definition(t) {
    t.field('addresses', {
      type: 'CompanyAddressMutation',
      resolve() {
        return true
      },
    })
  },
})

/**
 * Exports
 */
export * from './mutation.address.add'
export * from './mutation.address.delete'
export * from './mutation.address.edit'
