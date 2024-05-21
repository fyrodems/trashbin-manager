import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const OfficialAddressInfoMutation = objectType({
  name: 'OfficialAddressInfoMutation',
  definition() {},
})

export const OfficialAddressInfoMutationExtension = extendType({
  type: 'OfficialMutation',
  definition(t) {
    t.field('address', {
      type: 'OfficialAddressInfoMutation',
      resolve() {
        return true
      },
    })
  },
})

/**
 * Exports
 */
export * from './mutation.address.edit'
export * from './mutation.address.add'
export * from './mutation.address.delete'
