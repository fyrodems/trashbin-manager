import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const OfficialApplicationsQuery = objectType({
  name: 'OfficialApplicationsQuery',
  definition() {},
})

export const OfficialApplicationsQueryExtension = extendType({
  type: 'OfficialQuery',
  definition(t) {
    t.field('applications', {
      type: 'OfficialApplicationsQuery',
      resolve() {
        return true
      },
    })
  },
})

export const OfficialApplicationsMutation = objectType({
  name: 'OfficialApplicationsMutation',
  definition() {},
})

export const OfficialApplicationsMutationExtension = extendType({
  type: 'OfficialMutation',
  definition(t) {
    t.field('applications', {
      type: 'OfficialApplicationsMutation',
      resolve() {
        return true
      },
    })
  },
})

/**
 * Exports
 */
export * from './newUsers'
export * from './cards'
export * from './addressInfo'
export * from './dumpsters'
export * from './userInfo'
export * from './applicationsArchive'
