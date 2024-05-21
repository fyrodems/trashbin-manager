import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const UserInfoQuery = objectType({
  name: 'UserInfoQuery',
  definition() {},
})

export const UserInfoQueryExtension = extendType({
  type: 'UserQuery',
  definition(t) {
    t.field('info', {
      type: 'UserInfoQuery',
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
export * from './query.verification'
