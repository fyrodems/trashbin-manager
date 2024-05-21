import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const OfficialCardsApplicationsMutation = objectType({
  name: 'OfficialCardsApplicationsMutation',
  definition() {},
})

export const OfficialCardApplicationsMutationExtension = extendType({
  type: 'OfficialApplicationsMutation',
  definition(t) {
    t.field('cards', {
      type: 'OfficialCardsApplicationsMutation',
      resolve() {
        return true
      },
    })
  },
})

/**
 * Exports
 */

export * from './mutation.verify'
