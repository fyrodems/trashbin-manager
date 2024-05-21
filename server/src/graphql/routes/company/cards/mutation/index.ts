import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const CompanyCardsRentMutation = objectType({
  name: 'CompanyCardsRentMutation',
  definition() {},
})

export const CompanyCardsRentMutationExtension = extendType({
  type: 'CompanyMutation',
  definition(t) {
    t.field('cardsRent', {
      type: 'CompanyCardsRentMutation',
      resolve() {
        return true
      },
    })
  },
})

/**
 * Exports
 */
export * from './mutation.cardsRent.add'
export * from './mutation.cardsRent.delete'
