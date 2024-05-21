import { extendType, inputObjectType, nonNull } from 'nexus'

export const UserCardsDeleteMutationProps = inputObjectType({
  name: 'UserCardsDeleteMutationProps',
  definition(t) {
    t.nonNull.int('usersCards_ID')
  },
})

export const UserCardsDeleteMutation = extendType({
  type: 'UserCardsMutation',
  definition(t) {
    t.field('delete', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('UserCardsDeleteMutationProps'),
      },
      /* authorize: hasRole(['admin']), */
      async resolve(_parent, { props }, { prisma, user }) {
        const { usersCards_ID } = props
        try {
          if (!user) {
            throw new Error('Unauthorized!')
          }
          // UZYTKOWNIK NIE MOZE USUNAC KARTY Z BAZY, CO NAJWYZEJ JA ZABLOKOWAĆ

          await prisma.users_Cards.update({
            where: {
              usersCards_ID,
            },
            data: {
              usersCards_statusID: 5,
            },
          })

          const lastCardApplicationID =
            await prisma.cards_Applications.findMany({
              orderBy: {
                cardsApplications_ID: 'desc',
              },
              take: 1,
            })

          // usuwamy wszystkie wnioski związane z dodawaniem nowych altan do karty
          await prisma.dumpsters_Applications.updateMany({
            where: {
              dumpstersApplications_cardID: usersCards_ID,
            },
            data: {
              dumpstersApplications_statusID: 12,
            },
          })

          const applicationID = lastCardApplicationID[0]?.cardsApplications_ID

          await prisma.cards_Applications.create({
            data: {
              cardsApplications_ID: applicationID + 1 || 1,
              cardsApplications_dateAdded: new Date(),
              cardsApplications_dateReviewed: new Date(),
              cardsApplications_typeID: 22,
              cardsApplications_reviewedBy: null,
              cardsApplications_userID: user?.users_ID,
              cardsApplications_statusID: 10,
              cardsApplications_dumpstersIDs: '',
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
              description: 'Error while blocking card',
            },
          }
        }
      },
    })
  },
})
