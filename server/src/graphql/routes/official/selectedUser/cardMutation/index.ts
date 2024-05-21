import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const OfficialCardsMutation = objectType({
  name: 'OfficialCardsMutation',
  definition() {},
})

export const OfficialCardsMutationExtension = extendType({
  type: 'OfficialMutation',
  definition(t) {
    t.field('cards', {
      type: 'OfficialCardsMutation',
      resolve() {
        return true
      },
    })
  },
})

/**
 * Exports
 */
export * from './mutation.cards.add'
export * from './mutation.cards.delete'
export * from './mutation.cards.edit'
