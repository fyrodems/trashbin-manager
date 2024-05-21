import { extendType } from 'nexus'
import { loggedIn } from '@/utils/routeAuth'

export const UserAddressInfoGetQuery = extendType({
  type: 'UserAddressInfoQuery',
  definition(t) {
    t.list.nonNull.field('get', {
      type: 'UsersAddressType',
      authorize: loggedIn(),
      async resolve(_parent, _args, { user, prisma }) {
        if (!user) {
          throw new TypeError('Unauthorized')
        }

        const address = await prisma.users_Address.findMany({
          where: {
            AND: [
              { usersAddress_userID: user.users_ID },
              { usersAddress_statusID: 24 },
            ],
          },
        })

        return address
      },
    })
  },
})
