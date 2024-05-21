import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const UserContractQuery = objectType({
  name: 'UserContractQuery',
  definition() {},
})

export const UserContractQueryExtension = extendType({
  type: 'UserQuery',
  definition(t) {
    t.field('contract', {
      type: 'UserContractQuery',
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
