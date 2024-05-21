import { extendType, inputObjectType, nonNull } from 'nexus'

export const OfficialCardsAddMutationProps = inputObjectType({
  name: 'OfficialCardsAddMutationProps',
  definition(t) {
    t.nonNull.int('usersCards_userID')
    t.nonNull.int('usersCards_statusID', { description: 'id statusu karty' })
    t.nonNull.string('usersCards_number')
    t.nullable.field('usersCards_numberPIN', { type: 'String' })
  },
})

export const OfficialCardsAddMutation = extendType({
  type: 'OfficialCardsMutation',
  definition(t) {
    t.field('add', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('OfficialCardsAddMutationProps'),
      },

      async resolve(_parent, { props }, { prisma }) {
        const {
          usersCards_userID,
          usersCards_statusID,
          usersCards_number,
          usersCards_numberPIN,
        } = props
        try {
          const lastCardID = await prisma.users_Cards.findMany({
            orderBy: {
              usersCards_ID: 'desc',
            },
            take: 1,
          })

          const card = await prisma.users_Cards.findMany({
            where: {
              usersCards_number,
            },
          })

          if (card.length > 0) {
            return {
              status: {
                message: 'Error',
                description: 'There is card with this number',
              },
            }
          }

          await prisma.users_Cards.create({
            data: {
              usersCards_ID: lastCardID[0]?.usersCards_ID
                ? lastCardID[0].usersCards_ID + 1
                : 1,
              usersCards_userID,
              usersCards_statusID,
              usersCards_number,
              usersCards_numberPIN,
              usersCards_rentedToUserID: null,
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
              description: 'Error while creating card',
            },
          }
        }
      },
    })
  },
})
