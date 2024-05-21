import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const OfficialRatesMutation = objectType({
  name: 'OfficialRatesMutation',
  definition() {},
})

export const OfficialRatesMutationExtension = extendType({
  type: 'OfficialMutation',
  definition(t) {
    t.field('rates', {
      type: 'OfficialRatesMutation',
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
export * from './mutation.delete'
