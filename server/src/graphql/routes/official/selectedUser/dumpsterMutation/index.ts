import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const OfficialDumpstersMutation = objectType({
  name: 'OfficialDumpstersMutation',
  definition() {},
})

export const OfficialDumpstersMutationExtension = extendType({
  type: 'OfficialMutation',
  definition(t) {
    t.field('dumpsters', {
      type: 'OfficialDumpstersMutation',
      resolve() {
        return true
      },
    })
  },
})

/**
 * Exports
 */
export * from './mutation.dumpster.add'
export * from './mutation.dumpster.delete'
