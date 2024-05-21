import { extendType } from 'nexus'
import { loggedIn } from '@/utils/routeAuth'

export const AdminCardsOrdersGetQuery = extendType({
  type: 'AdminCardsOrdersQuery',
  definition(t) {
    t.list.nonNull.field('get', {
      type: 'AdminNewOrderType',
      authorize: loggedIn(),
      async resolve(_parent, _, { user, prisma }) {
        if (!user || user.users_typeID !== 7) {
          throw new TypeError('Unauthorized')
        }

        // nowe zlecenia
        const cards = await prisma.cardsBulk_Order.findMany({
          where: {
            cardsBulkOrder_statusID: 19,
          },
        })

        const cardsUsersID = cards.map((c) => c.cardsBulkOrder_userID)

        // zglaszajacy zlecenie
        const users = await prisma.users.findMany({
          where: {
            users_ID: {
              in: cardsUsersID,
            },
          },
        })

        const cardOrders = cards.map((c) => {
          return {
            ...c,
            cardsBulkOrder_orderDate: c.cardsBulkOrder_orderDate.toISOString(),
            // eslint-disable-next-line unicorn/prefer-array-find
            user: users.filter(
              (u) => u.users_ID === c.cardsBulkOrder_userID
            )[0],
          }
        })

        const addresses = await prisma.users_Address.findMany({
          where: {
            AND: [
              {
                usersAddress_userID: {
                  in: cardOrders.map((c) => c.user.users_ID),
                },
              },
              { usersAddress_statusID: 24 },
            ],
          },
        })

        const cardOrdersResult = cardOrders.map((u) => {
          const addressesList = []

          for (const address of addresses) {
            if (address.usersAddress_userID === u.user.users_ID) {
              addressesList.push(address)
            }
          }

          return {
            ...u,
            user: {
              users_ID: u.user.users_ID,
              users_login: u.user.users_login,
              users_typeID: u.user.users_typeID,
              users_statusID: u.user.users_statusID,
              users_identificationNumber: u.user.users_identificationNumber,
              users_phoneNumber: u.user.users_phoneNumber,
              users_name: u.user.users_name,
              addresses: addressesList,
            },
          }
        })

        return cardOrdersResult
      },
    })
  },
})
