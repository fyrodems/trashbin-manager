import { extendType, inputObjectType, nonNull } from 'nexus'

export const CompanyCardsRentAddMutationProps = inputObjectType({
  name: 'CompanyCardsRentAddMutationProps',
  definition(t) {
    t.nonNull.int('cardID')
    t.nonNull.int('userID')
  },
})

export const CompanyCardsRentAddMutation = extendType({
  type: 'CompanyCardsRentMutation',
  definition(t) {
    t.field('add', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('CompanyCardsRentAddMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const { userID, cardID } = props
        try {
          // sprawdzamy, czy uzytkownik nie probuje dodac drugiego uzytkownika do karty, jesli tak, nie pozwalamy na to
          const card = await prisma.users_Cards.findUnique({
            where: {
              usersCards_ID: cardID,
            },
          })
          if (!card) {
            throw new Error('Nie znaleziono karty')
          }

          if (card.usersCards_rentedToUserID !== null) {
            return {
              status: {
                message: 'Error',
                description: 'Karta ma już przypisane użytkownika',
              },
            }
          }

          await prisma.users_Cards.update({
            where: {
              usersCards_ID: cardID,
            },
            data: {
              usersCards_rentedToUserID: userID,
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
              description: 'Error while adding user',
            },
          }
        }
      },
    })
  },
})
