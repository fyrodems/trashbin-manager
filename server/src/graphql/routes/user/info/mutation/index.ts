import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const UserInfoMutation = objectType({
  name: 'UserInfoMutation',
  definition() {},
})

export const UserInfoMutationExtension = extendType({
  type: 'UserMutation',
  definition(t) {
    t.field('info', {
      type: 'UserInfoMutation',
      resolve() {
        return true
      },
    })
  },
})

/**
 * Exports
 */
export * from './mutation.profile'
export * from './mutation.contacts'
export * from './mutation.password'
export * from './mutation.pin'
