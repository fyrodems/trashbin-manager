import { extendType } from 'nexus'

export const CompanyCardsGetQueryResult = extendType({
  type: 'CompanyCardsQuery',
  definition(t) {
    t.list.nonNull.field('get', {
      type: 'CardsBulkOrderType',
      async resolve(_parent, _, { user, prisma }) {
        if (!user) {
          throw new TypeError('Unauthorized')
        }

        if (user.users_typeID === 9 || user.users_typeID === 10) {
          const companyCardsOrders = await prisma.cardsBulk_Order.findMany({
            where: {
              AND: [{ cardsBulkOrder_userID: user.users_ID }],
            },
          })

          const result = companyCardsOrders.map((o) => {
            return {
              ...o,
              cardsBulkOrder_orderDate:
                o.cardsBulkOrder_orderDate.toISOString(),
            }
          })

          return result
        }

        throw new TypeError('Unauthorized')
      },
    })
  },
})
