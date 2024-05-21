import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const OfficialApplicationsDumpstersQuery = objectType({
  name: 'OfficialApplicationsDumpstersQuery',
  definition() {},
})

export const OfficialApplicationsDumpstersQueryExtension = extendType({
  type: 'OfficialApplicationsQuery',
  definition(t) {
    t.field('dumpsters', {
      type: 'OfficialApplicationsDumpstersQuery',
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
