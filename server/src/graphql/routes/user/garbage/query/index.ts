import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const UserGarbageQuery = objectType({
  name: 'UserGarbageQuery',
  definition() {},
})

export const UserGarbageQueryExtension = extendType({
  type: 'UserQuery',
  definition(t) {
    t.field('garbage', {
      type: 'UserGarbageQuery',
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
