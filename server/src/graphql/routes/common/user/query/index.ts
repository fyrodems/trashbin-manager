import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const CommonUserQuery = objectType({
  name: 'CommonUserQuery',
  definition() {},
})

export const CommonUserQueryExtension = extendType({
  type: 'CommonQuery',
  definition(t) {
    t.field('user', {
      type: 'CommonUserQuery',
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
