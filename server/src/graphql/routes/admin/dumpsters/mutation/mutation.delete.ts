import { extendType, inputObjectType, nonNull } from 'nexus'
import { loggedIn } from '@/utils/routeAuth'

export const AdminDumpstersDeleteMutationProps = inputObjectType({
  name: 'AdminDumpstersDeleteMutationProps',
  definition(t) {
    t.nonNull.int('dumpster_ID')
  },
})

export const AdminDumpstersDeleteMutation = extendType({
  type: 'AdminDumpstersMutation',
  definition(t) {
    t.field('delete', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('AdminDumpstersDeleteMutationProps'),
      },
      authorize: loggedIn(),
      async resolve(_parent, { props }, { prisma }) {
        const { dumpster_ID } = props
        try {
          // nie usuwamy historii śmieci wyrzuconych do tej altany ani jej kubłów
          // anulujemy wszelkie istniejące wnioski o przyznanie dostępu do tej altany
          await prisma.dumpsters_Applications.updateMany({
            where: {
              dumpstersApplications_dumpsterID: dumpster_ID,
            },
            data: {
              dumpstersApplications_dateReviewed: new Date(),
              dumpstersApplications_statusID: 12,
            },
          })

          // dezaktywujemy dostępy do wybranej altany z każdej karty, która ma do niej dostęp
          const cardsWithAccess = await prisma.users_Cards.findMany({
            where: {
              usersCards_dumpstersIDs: {
                contains: `${dumpster_ID.toString()}`,
              },
            },
          })

          for await (const card of cardsWithAccess) {
            const dumpstersIDs: string = card?.usersCards_dumpstersIDs as string
            const dumpstersArray: string[] = dumpstersIDs.split(';')
            const arrayWODumpster: string[] = dumpstersArray.filter(
              (id: string) => id !== dumpster_ID.toString()
            )
            const newIDs: string = arrayWODumpster.join(';')

            await prisma.users_Cards.update({
              where: {
                usersCards_ID: card.usersCards_ID,
              },
              data: { usersCards_dumpstersIDs: newIDs },
            })
          }

          // anulujemy własność altany, jeśli istnieje (dotyczy firm i spółdzielni)
          await prisma.dumpster_Owners.updateMany({
            where: {
              dumpsterOwners_dumpsterID: dumpster_ID,
            },
            data: {
              dumpsterOwners_statusID: 18,
            },
          })

          // anulujemy wszelkie kontrakty przypisane do altany
          await prisma.dumpster_Contract.updateMany({
            where: {
              dumpsterContract_dumpsterID: dumpster_ID,
            },
            data: {
              dumpsterContract_statusID: 16,
            },
          })

          // zmieniamy status altany na nieaktywny
          await prisma.dumpster.update({
            where: {
              dumpster_ID,
            },
            data: {
              dumpster_statusID: 28,
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
            },
          }
        }
      },
    })
  },
})
