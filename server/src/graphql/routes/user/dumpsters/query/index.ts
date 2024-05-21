import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const UserDumpsterQuery = objectType({
  name: 'UserDumpsterQuery',
  definition() {},
})

export const UserDumpsterQueryExtension = extendType({
  type: 'UserQuery',
  definition(t) {
    t.field('dumpster', {
      type: 'UserDumpsterQuery',
      resolve() {
        return true
      },
    })
  },
})

/**
 * Exports
 */
export * from './query.get'
