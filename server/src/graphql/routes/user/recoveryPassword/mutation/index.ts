import { extendType, objectType } from 'nexus'

export const UserRecoveryMutation = objectType({
  name: 'UserRecoveryMutation',
  definition() {},
})

export const UserRecoveryMutationExtension = extendType({
  type: 'UserMutation',
  definition(t) {
    t.field('passwordRecovery', {
      type: 'UserRecoveryMutation',
      resolve() {
        return true
      },
    })
  },
})

export * from './mutation.isUserExist'
export * from './mutation.changePassword'
