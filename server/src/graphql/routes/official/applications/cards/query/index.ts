import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const OfficialApplicationsCardsQuery = objectType({
  name: 'OfficialApplicationsCardsQuery',
  definition() {},
})

export const OfficialApplicationsCardsQueryExtension = extendType({
  type: 'OfficialApplicationsQuery',
  definition(t) {
    t.field('cards', {
      type: 'OfficialApplicationsCardsQuery',
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
