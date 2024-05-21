import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const AdminDumpstersMutation = objectType({
  name: 'AdminDumpstersMutation',
  definition() {},
})

export const AdminDumpstersMutationExtension = extendType({
  type: 'AdminMutation',
  definition(t) {
    t.field('dumpsters', {
      type: 'AdminDumpstersMutation',
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
export * from './mutation.edit'
export * from './mutation.editBin'
