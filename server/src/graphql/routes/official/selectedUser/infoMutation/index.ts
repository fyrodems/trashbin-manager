import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const OfficialUserInfoMutation = objectType({
  name: 'OfficialUserInfoMutation',
  definition() {},
})

export const OfficialUserInfoMutationExtension = extendType({
  type: 'OfficialMutation',
  definition(t) {
    t.field('info', {
      type: 'OfficialUserInfoMutation',
      resolve() {
        return true
      },
    })
  },
})

/**
 * Exports
 */
export * from './mutation.info.edit'
