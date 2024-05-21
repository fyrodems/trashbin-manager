import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const SuperOfficialOfficialsQuery = objectType({
  name: 'SuperOfficialOfficialsQuery',
  definition() {},
})

export const SuperOfficialOfficialsQueryExtension = extendType({
  type: 'OfficialQuery',
  definition(t) {
    t.field('officials', {
      type: 'SuperOfficialOfficialsQuery',
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
