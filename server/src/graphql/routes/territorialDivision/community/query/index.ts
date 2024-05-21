import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const TerritorialCommunitiesQuery = objectType({
  name: 'TerritorialCommunitiesQuery',
  definition() {},
})

export const TerritorialCommunitiesQueryExtension = extendType({
  type: 'TerritorialDivisionQuery',
  definition(t) {
    t.field('communities', {
      type: 'TerritorialCommunitiesQuery',
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
