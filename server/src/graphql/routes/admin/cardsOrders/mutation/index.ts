import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const AdminCardsOrdersMutation = objectType({
  name: 'AdminCardsOrdersMutation',
  definition() {},
})

export const AdminCardsOrdersMutationExtension = extendType({
  type: 'AdminMutation',
  definition(t) {
    t.field('cardsOrders', {
      type: 'AdminCardsOrdersMutation',
      resolve() {
        return true
      },
    })
  },
})

/**
 * Exports
 */

export * from './mutation.verifyAdd'
