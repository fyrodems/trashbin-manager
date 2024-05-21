import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const UserAddressInfoMutation = objectType({
  name: 'UserAddressInfoMutation',
  definition() {},
})

export const UserAddressInfoMutationExtension = extendType({
  type: 'UserMutation',
  definition(t) {
    t.field('addressInfo', {
      type: 'UserAddressInfoMutation',
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
