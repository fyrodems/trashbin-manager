import { extendType, inputObjectType, nonNull } from 'nexus'

export const OfficialCardsEditMutationProps = inputObjectType({
  name: 'OfficialCardsEditMutationProps',
  definition(t) {
    t.nonNull.int('usersCards_ID')
    t.nonNull.int('usersCards_statusID', { description: 'id statusu karty' })
    t.nonNull.string('usersCards_number')
    t.nullable.field('usersCards_numberPIN', { type: 'String' })
  },
})

export const OfficialCardsEditMutation = extendType({
  type: 'OfficialCardsMutation',
  definition(t) {
    t.field('edit', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('OfficialCardsEditMutationProps'),
      },
      /* authorize: hasRole(['admin']), */
      async resolve(_parent, { props }, { prisma }) {
        const {
          usersCards_ID,
          usersCards_statusID,
          usersCards_number,
          usersCards_numberPIN,
        } = props
        try {
          await prisma.users_Cards.update({
            where: {
              usersCards_ID,
            },
            data: {
              usersCards_statusID,
              usersCards_number,
              usersCards_numberPIN,
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
              description: 'Error while editing card',
            },
          }
        }
      },
    })
  },
})
