import { extendType, inputObjectType, nonNull } from 'nexus'

export const UserDumpstersDeleteMutationProps = inputObjectType({
  name: 'UserDumpstersDeleteMutationProps',
  definition(t) {
    t.nonNull.int('card_ID')
    t.nonNull.int('dumpster_ID')
  },
})

export const UserDumpstersDeleteMutation = extendType({
  type: 'UserDumpstersMutation',
  definition(t) {
    t.field('delete', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('UserDumpstersDeleteMutationProps'),
      },
      async resolve(_parent, { props }, { prisma, user }) {
        const { card_ID, dumpster_ID } = props
        try {
          if (!user) {
            throw new Error('Unauthorized!')
          }
          // TUTAJ NIE JEST POTRZEBNY WNIOSEK - USUWAĆ Z KARTY MOZNA OD RAZU, JESLI ZAŚ BĘDZIE TO POMYŁKA, TO PO PROSTU SIĘ WYŚLE WNIOSEK PONOWNIE

          const card = await prisma.users_Cards.findUnique({
            where: {
              usersCards_ID: card_ID,
            },
          })

          const dumpstersIDs: string = card?.usersCards_dumpstersIDs ?? ''
          const dumpstersArray: string[] = dumpstersIDs.split(';')
          const arrayWODumpster: string[] = dumpstersArray.filter(
            (id: string) => id !== dumpster_ID.toString()
          )
          const newIDs: string = arrayWODumpster.join(';')

          await prisma.users_Cards.update({
            where: {
              usersCards_ID: card_ID,
            },
            data: {
              usersCards_dumpstersIDs: newIDs,
            },
          })

          const lastDumpsterApplicationID =
            await prisma.dumpsters_Applications.findMany({
              orderBy: {
                dumpstersApplications_ID: 'desc',
              },
              take: 1,
            })

          const applicationID =
            lastDumpsterApplicationID[0]?.dumpstersApplications_ID

          await prisma.dumpsters_Applications.create({
            data: {
              dumpstersApplications_ID: applicationID + 1 || 1,
              dumpstersApplications_dateAdded: new Date(),
              dumpstersApplications_dateReviewed: new Date(),
              dumpstersApplications_typeID: 23,
              dumpstersApplications_reviewedBy: null,
              dumpstersApplications_userID: user.users_ID,
              dumpstersApplications_dumpsterID: dumpster_ID,
              dumpstersApplications_statusID: 10,
              dumpstersApplications_cardID: card_ID,
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
              description: 'Error while deleting dumpster',
            },
          }
        }
      },
    })
  },
})
