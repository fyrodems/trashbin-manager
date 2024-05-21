import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const CompanyOccupantsQuery = objectType({
  name: 'CompanyOccupantsQuery',
  definition() {},
})

export const CompanyOccupantsQueryExtension = extendType({
  type: 'CompanyQuery',
  definition(t) {
    t.field('occupants', {
      type: 'CompanyOccupantsQuery',
      resolve() {
        return true
      },
    })
  },
})

export * from './query.get'
