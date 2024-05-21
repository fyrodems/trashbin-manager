import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const OfficialUserInfoApplicationsMutation = objectType({
  name: 'OfficialUserInfoApplicationsMutation',
  definition() {},
})

export const OfficialUserInfoApplicationsMutationExtension = extendType({
  type: 'OfficialApplicationsMutation',
  definition(t) {
    t.field('userInfo', {
      type: 'OfficialUserInfoApplicationsMutation',
      resolve() {
        return true
      },
    })
  },
})

/**
 * Exports
 */

export * from './mutation.verifyEdit'
