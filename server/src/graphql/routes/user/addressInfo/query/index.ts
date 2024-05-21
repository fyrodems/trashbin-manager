import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const UserAddressInfoQuery = objectType({
  name: 'UserAddressInfoQuery',
  definition() {},
})

export const UserAddressInfoQueryExtension = extendType({
  type: 'UserQuery',
  definition(t) {
    t.field('addressInfo', {
      type: 'UserAddressInfoQuery',
      resolve() {
        return true
      },
    })
  },
})

/**
 * Exports
 */
export * from './query.get'
