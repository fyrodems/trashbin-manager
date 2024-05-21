import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const CompanyDumpstersMutation = objectType({
  name: 'CompanyDumpstersMutation',
  definition() {},
})

export const CompanyDumpstersMutationExtension = extendType({
  type: 'CompanyMutation',
  definition(t) {
    t.field('dumpsters', {
      type: 'CompanyDumpstersMutation',
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
