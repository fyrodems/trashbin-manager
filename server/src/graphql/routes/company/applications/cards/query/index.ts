import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const CompanyCardsQuery = objectType({
  name: 'CompanyCardsQuery',
  definition() {},
})

export const CompanyCardsQueryExtension = extendType({
  type: 'CompanyQuery',
  definition(t) {
    t.field('cards', {
      type: 'CompanyCardsQuery',
      resolve() {
        return true
      },
    })
  },
})

export * from './query.get'
