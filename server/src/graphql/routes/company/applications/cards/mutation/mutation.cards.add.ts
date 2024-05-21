import { extendType, inputObjectType, nonNull } from 'nexus'

export const CompanyCardsAddMutationProps = inputObjectType({
  name: 'CompanyCardsAddMutationProps',
  definition(t) {
    t.nonNull.int('userID')
    t.nonNull.int('numOfCards')
  },
})

// DOTYCZY ZAMÓWIENIA NOWEGO PAKITU KART OD ADMINA
export const CompanyCardsAddMutation = extendType({
  type: 'CompanyCardsMutation',
  definition(t) {
    t.field('add', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('CompanyCardsAddMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const { userID, numOfCards } = props
        try {
          // SPRAWDŹ CZY DANY UŻYTKOWNIK POSIADA JUŻ ZŁOŻONE ZAMÓWIENIE, JEŚLI TAK, NIE POZWÓL NA WYSŁANIE ZGŁOSZENIA
          const userOrder = await prisma.cardsBulk_Order.findMany({
            where: {
              AND: [
                { cardsBulkOrder_userID: userID },
                { cardsBulkOrder_statusID: 19 },
              ],
            },
          })

          if (userOrder.length > 0) {
            return {
              status: {
                message: 'Error',
                description: 'Użytkownik wysłał juz wniosek',
              },
            }
          }

          // WYŚLIJ ZAMÓWIENIE
          const lastCardBulkOrderID = await prisma.cardsBulk_Order.findMany({
            orderBy: {
              cardsBulkOrder_ID: 'desc',
            },
            take: 1,
          })

          await prisma.cardsBulk_Order.create({
            data: {
              cardsBulkOrder_ID: lastCardBulkOrderID[0]?.cardsBulkOrder_ID
                ? lastCardBulkOrderID[0].cardsBulkOrder_ID + 1
                : 1,
              cardsBulkOrder_numOfCards: numOfCards,
              cardsBulkOrder_orderDate: new Date(),
              cardsBulkOrder_userID: userID,
              cardsBulkOrder_statusID: 19,
            },
          })

          return {
            status: {
              message: 'Success',
            },
          }
        } catch {
          return {
            status: {
              message: 'Error',
              description: 'Error while creating order',
            },
          }
        }
      },
    })
  },
})
