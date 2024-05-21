import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const OfficialContractsMutation = objectType({
  name: 'OfficialContractsMutation',
  definition() {},
})

export const OfficialContractsMutationExtension = extendType({
  type: 'OfficialMutation',
  definition(t) {
    t.field('contracts', {
      type: 'OfficialContractsMutation',
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
export * from './mutation.delete'
