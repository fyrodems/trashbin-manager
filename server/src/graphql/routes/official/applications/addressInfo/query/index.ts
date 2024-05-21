import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const OfficialApplicationsAddressInfoQuery = objectType({
  name: 'OfficialApplicationsAddressInfoQuery',
  definition() {},
})

export const OfficialApplicationsAddressInfoQueryExtension = extendType({
  type: 'OfficialApplicationsQuery',
  definition(t) {
    t.field('addressInfo', {
      type: 'OfficialApplicationsAddressInfoQuery',
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
