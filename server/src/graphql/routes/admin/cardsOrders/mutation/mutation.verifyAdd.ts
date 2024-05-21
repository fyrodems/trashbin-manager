import { extendType, inputObjectType, nonNull } from 'nexus'

export const AdminCardsOrdersVerifyAddMutationProps = inputObjectType({
  name: 'AdminCardsOrdersVerifyAddMutationProps',
  definition(t) {
    t.nonNull.boolean('isVerified')
    t.nonNull.int('cardsBulkOrder_ID')
    t.nonNull.list.nonNull.string('cardsNumbers')
  },
})

export const AdminCardsOrdersVerifyAddMutation = extendType({
  type: 'AdminCardsOrdersMutation',
  definition(t) {
    t.field('verifyAdd', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('AdminCardsOrdersVerifyAddMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const { isVerified, cardsBulkOrder_ID, cardsNumbers } = props

        try {
          const order = await prisma.cardsBulk_Order.findUnique({
            where: { cardsBulkOrder_ID },
          })

          // JEŚLI ZLECCENIE ZOSTAŁO ZAAKCEPTOWANE, ZMIEN JEGO STATUS, W PRZECIWNYM RAZIE EDYTUJ JEGO STATUS
          if (isVerified) {
            // jeśli liczba kart w zleceniu i liczba podanych numerow sie nie zgadza, wyrzuć błąd
            if (cardsNumbers.length !== order?.cardsBulkOrder_numOfCards) {
              return {
                status: {
                  message: 'Error',
                  description:
                    'Liczba numerow nie odpowiada liczbie zamowionych kart',
                },
              }
            }
            // dodaj karty do bazy

            const cardsToCreate = []
            const lastCardID = await prisma.users_Cards.findMany({
              orderBy: {
                usersCards_ID: 'desc',
              },
              take: 1,
            })
            for (let i = 1; i < cardsNumbers.length + 1; i++) {
              const id = lastCardID[0].usersCards_ID + i
              cardsToCreate.push({
                usersCards_ID: id || 1,
                usersCards_userID: order.cardsBulkOrder_userID,
                usersCards_statusID: 4,
                usersCards_number: cardsNumbers[i - 1],
                usersCards_rentedToUserID: null,
              })
            }

            await prisma.users_Cards.createMany({
              data: [...cardsToCreate],
            })

            await prisma.cardsBulk_Order.update({
              where: { cardsBulkOrder_ID },
              data: { cardsBulkOrder_statusID: 20 },
            })
          } else {
            // zmien status wniosku na odrzucony
            await prisma.cardsBulk_Order.update({
              where: { cardsBulkOrder_ID },
              data: { cardsBulkOrder_statusID: 21 },
            })
          }

          return {
            status: {
              message: 'Success',
            },
          }
        } catch {
          return {
            status: {
              message: 'Error',
              description: 'Error while veryfing',
            },
          }
        }
      },
    })
  },
})
