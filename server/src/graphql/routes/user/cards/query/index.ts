import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const UserCardQuery = objectType({
  name: 'UserCardQuery',
  definition() {},
})

export const UserCardQueryExtension = extendType({
  type: 'UserQuery',
  definition(t) {
    t.field('card', {
      type: 'UserCardQuery',
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
export * from './query.cardsWithDumpsters'
