import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const OfficialApplicationsArchiveQuery = objectType({
  name: 'OfficialApplicationsArchiveQuery',
  definition() {},
})

export const OfficialApplicationsArchiveQueryExtension = extendType({
  type: 'OfficialApplicationsQuery',
  definition(t) {
    t.field('archive', {
      type: 'OfficialApplicationsArchiveQuery',
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
