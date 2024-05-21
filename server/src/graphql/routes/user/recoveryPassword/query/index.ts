import { extendType, objectType } from 'nexus'

export const UserRecoveryQuery = objectType({
  name: 'UserRecoveryQuery',
  definition() {},
})

export const UserRecoveryQueryExtension = extendType({
  type: 'UserQuery',
  definition(t) {
    t.field('passwordRecovery', {
      type: 'UserRecoveryQuery',
      resolve() {
        return true
      },
    })
  },
})

export * from './query.recoveryToken'
