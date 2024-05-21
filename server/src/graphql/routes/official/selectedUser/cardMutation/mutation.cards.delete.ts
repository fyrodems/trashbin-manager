import { extendType, inputObjectType, nonNull } from 'nexus'

export const OfficialCardsDeleteMutationProps = inputObjectType({
  name: 'OfficialCardsDeleteMutationProps',
  definition(t) {
    t.nonNull.int('usersCards_ID')
  },
})

export const OfficialCardsDeleteMutation = extendType({
  type: 'OfficialCardsMutation',
  definition(t) {
    t.field('delete', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('OfficialCardsDeleteMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const { usersCards_ID } = props
        try {
          /*       await prisma.users_Cards.updateMany({
            where: {
              usersCards_userID: usersCards_ID,
            },
            data: {
              usersCards_dumpstersIDs: '',
            },
          }) */

          // usuwamy wszystkie wnioski związane z dodawaniem nowych altan do karty
          await prisma.dumpsters_Applications.updateMany({
            where: {
              dumpstersApplications_cardID: usersCards_ID,
            },
            data: {
              dumpstersApplications_statusID: 12,
            },
          })

          // blokujemy karte
          await prisma.users_Cards.update({
            where: {
              usersCards_ID,
            },
            data: {
              usersCards_statusID: 5,
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
              description: 'Error while deleting card',
            },
          }
        }
      },
    })
  },
})
