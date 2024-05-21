import { extendType, inputObjectType, nonNull } from 'nexus'

export const OfficialDumpstersDeleteMutationProps = inputObjectType({
  name: 'OfficialDumpstersDeleteMutationProps',
  definition(t) {
    t.nonNull.int('card_ID')
    t.nonNull.int('dumpster_ID')
  },
})

export const OfficialDumpstersDeleteMutation = extendType({
  type: 'OfficialDumpstersMutation',
  definition(t) {
    t.field('delete', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('OfficialDumpstersDeleteMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const { card_ID, dumpster_ID } = props
        try {
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
