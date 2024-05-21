import { extendType } from 'nexus'
import { loggedIn } from '@/utils/routeAuth'

export const UserCardGetQuery = extendType({
  type: 'UserCardQuery',
  definition(t) {
    t.list.nonNull.field('get', {
      type: 'UsersCardsType',
      authorize: loggedIn(),
      async resolve(_parent, _args, { user, prisma }) {
        if (!user) {
          throw new TypeError('Unauthorized')
        }

        const cards = await prisma.users_Cards.findMany({
          where: {
            usersCards_userID: user.users_ID,
          },
        })

        return cards as Array<{
          usersCards_ID: number
          usersCards_userID: number
          usersCards_statusID: number
          usersCards_number: string
          usersCards_numberPIN: string
          usersCards_rentedToUserID?: number
        }>
      },
    })
  },
})
