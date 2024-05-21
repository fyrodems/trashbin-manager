import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const AuthMutation = objectType({
  name: 'AuthMutation',
  definition() {},
})

export const AuthMutationExtension = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('auth', {
      type: 'AuthMutation',
      resolve() {
        return true
      },
    })
  },
})

/**
 * Exports
 */
export * from './mutation.login'
export * from './mutation.register'
