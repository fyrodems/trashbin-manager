import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const OfficialUserContractsMutation = objectType({
  name: 'OfficialUserContractsMutation',
  definition() {},
})

export const OfficialUserContractsMutationExtension = extendType({
  type: 'OfficialMutation',
  definition(t) {
    t.field('userContracts', {
      type: 'OfficialUserContractsMutation',
      resolve() {
        return true
      },
    })
  },
})

/**
 * Exports
 */
export * from './mutation.edit'
export * from './mutation.add'
export * from './mutation.archivize'
