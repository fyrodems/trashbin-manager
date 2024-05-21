import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const AdminCardsOrdersQuery = objectType({
  name: 'AdminCardsOrdersQuery',
  definition() {},
})

export const AdminCardsOrdersQueryExtension = extendType({
  type: 'AdminQuery',
  definition(t) {
    t.field('cardsOrders', {
      type: 'AdminCardsOrdersQuery',
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
