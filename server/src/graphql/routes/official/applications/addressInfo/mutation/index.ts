import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const OfficialAddressInfoApplicationsMutation = objectType({
  name: 'OfficialAddressInfoApplicationsMutation',
  definition() {},
})

export const OfficialAddressInfoApplicationsMutationExtension = extendType({
  type: 'OfficialApplicationsMutation',
  definition(t) {
    t.field('addressInfo', {
      type: 'OfficialAddressInfoApplicationsMutation',
      resolve() {
        return true
      },
    })
  },
})

/**
 * Exports
 */

export * from './mutation.verifyAdd'
export * from './mutation.verifyDelete'
export * from './mutation.verifyEdit'
