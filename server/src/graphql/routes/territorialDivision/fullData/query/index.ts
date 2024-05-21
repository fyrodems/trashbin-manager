import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const TerritorialFullDataQuery = objectType({
  name: 'TerritorialFullDataQuery',
  definition() {},
})

export const TerritorialFullDataQueryExtension = extendType({
  type: 'TerritorialDivisionQuery',
  definition(t) {
    t.field('fullData', {
      type: 'TerritorialFullDataQuery',
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
