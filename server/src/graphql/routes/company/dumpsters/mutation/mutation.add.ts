import { extendType, inputObjectType, nonNull } from 'nexus'

export const CompanyDumpstersAddMutationProps = inputObjectType({
  name: 'CompanyDumpstersAddMutationProps',
  definition(t) {
    t.nonNull.int('card_ID')
    t.nonNull.int('dumpster_ID')
    t.nonNull.int('user_ID')
  },
})

export const CompanyDumpstersAddMutation = extendType({
  type: 'CompanyDumpstersMutation',
  definition(t) {
    t.field('add', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('CompanyDumpstersAddMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const { card_ID, dumpster_ID } = props
        try {
          // sprawdzamy, czy jest juz takie polaczenie, a jak nie, to je dodajemy
          const card = await prisma.users_Cards.findUnique({
            where: {
              usersCards_ID: card_ID,
            },
          })
          const dumpstersIDs: string = card?.usersCards_dumpstersIDs ?? ''
          const dumpstersArray: string[] = dumpstersIDs.split(';')
          const connectedDumpsters = dumpstersArray
            .map(Number)
            .filter((id) => id !== 0)
          if (!connectedDumpsters.includes(dumpster_ID)) {
            connectedDumpsters.push(dumpster_ID)
            const newDumpstersIDs = connectedDumpsters
              .toString()
              .replace(/,/g, ';')
            await prisma.users_Cards.update({
              where: {
                usersCards_ID: card_ID,
              },
              data: {
                usersCards_dumpstersIDs: newDumpstersIDs,
              },
            })

            return {
              status: {
                message: 'Success',
              },
            }
          }

          return {
            status: {
              message: 'Error',
              description: 'Connection exists',
            },
          }
        } catch {
          return {
            status: {
              message: 'Error',
              description: 'Error while adding dumpster',
            },
          }
        }
      },
    })
  },
})
