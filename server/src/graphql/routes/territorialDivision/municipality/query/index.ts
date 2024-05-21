import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const TerritorialMunicipalitiesQuery = objectType({
  name: 'TerritorialMunicipalitiesQuery',
  definition() {},
})

export const TerritorialMunicipalitiesQueryExtension = extendType({
  type: 'TerritorialDivisionQuery',
  definition(t) {
    t.field('municipalities', {
      type: 'TerritorialMunicipalitiesQuery',
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
