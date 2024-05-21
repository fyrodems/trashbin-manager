import { extendType, inputObjectType, nonNull } from 'nexus'

export const CompanyCardsRentDeleteMutationProps = inputObjectType({
  name: 'CompanyCardsRentDeleteMutationProps',
  definition(t) {
    t.nonNull.int('cardID')
    t.nonNull.int('userID')
  },
})

export const CompanyCardsRentDeleteMutation = extendType({
  type: 'CompanyCardsRentMutation',
  definition(t) {
    t.field('delete', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('CompanyCardsRentDeleteMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const { userID, cardID } = props
        try {
          // sprawdzamy, czy uzytkownik nie probuje usunąć użytkownika z karty, na której go nie ma, jesli tak, nie pozwalamy na to
          const card = await prisma.users_Cards.findUnique({
            where: {
              usersCards_ID: cardID,
            },
          })
          if (!card) {
            throw new Error('Nie znaleziono karty')
          }

          if (card.usersCards_rentedToUserID !== userID) {
            return {
              status: {
                message: 'Error',
                description: 'Uzytkownik nie jest połączony z kartą',
              },
            }
          }

          await prisma.users_Cards.update({
            where: {
              usersCards_ID: cardID,
            },
            data: {
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
              description: 'Error while deleting user',
            },
          }
        }
      },
    })
  },
})
