import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const OfficialDumpstersApplicationsMutation = objectType({
  name: 'OfficialDumpstersApplicationsMutation',
  definition() {},
})

export const OfficialDumpstersApplicationsMutationExtension = extendType({
  type: 'OfficialApplicationsMutation',
  definition(t) {
    t.field('dumpsters', {
      type: 'OfficialDumpstersApplicationsMutation',
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
