import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const AdminDumpstersQuery = objectType({
  name: 'AdminDumpstersQuery',
  definition() {},
})

export const AdminDumpstersQueryExtension = extendType({
  type: 'AdminQuery',
  definition(t) {
    t.field('dumpsters', {
      type: 'AdminDumpstersQuery',
      resolve() {
        return true
      },
    })
  },
})

/**
 * Exports
 */

export * from './query.search'
