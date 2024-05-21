import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const CompanyCardsMutation = objectType({
  name: 'CompanyCardsMutation',
  definition() {},
})

export const CompanyCardsMutationExtension = extendType({
  type: 'CompanyMutation',
  definition(t) {
    t.field('cards', {
      type: 'CompanyCardsMutation',
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
