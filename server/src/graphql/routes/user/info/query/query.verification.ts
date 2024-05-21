import { extendType } from 'nexus'
import { loggedIn } from '@/utils/routeAuth'

export const UserInfoVerificationQuery = extendType({
  type: 'UserInfoQuery',
  definition(t) {
    t.field('verification', {
      type: 'Int',
      authorize: loggedIn(),
      async resolve(_parent, _args, { user }) {
        if (!user) {
          throw new TypeError('Unauthorized')
        }
        // nie mamy verification code, wiec zwracam iD

        return /* user.verificationCode  */ user.users_ID
      },
    })
  },
})
