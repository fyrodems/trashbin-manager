import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const CompanyOccupantsMutation = objectType({
  name: 'CompanyOccupantsMutation',
  definition() {},
})

export const CompanyOccupantsMutationExtension = extendType({
  type: 'CompanyMutation',
  definition(t) {
    t.field('occupants', {
      type: 'CompanyOccupantsMutation',
      resolve() {
        return true
      },
    })
  },
})

/**
 * Exports
 */
export * from './mutation.add'
export * from './mutation.delete'
