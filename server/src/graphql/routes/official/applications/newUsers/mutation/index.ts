import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const OfficialNewUserApplicationMutation = objectType({
  name: 'OfficialNewUserApplicationMutation',
  definition() {},
})

export const OfficialNewUserApplicationMutationExtension = extendType({
  type: 'OfficialApplicationsMutation',
  definition(t) {
    t.field('newUser', {
      type: 'OfficialNewUserApplicationMutation',
      resolve() {
        return true
      },
    })
  },
})

/**
 * Exports
 */

export * from './mutation.verify'
