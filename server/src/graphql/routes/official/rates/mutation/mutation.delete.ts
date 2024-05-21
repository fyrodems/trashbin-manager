import { extendType, inputObjectType, nonNull } from 'nexus'

export const OfficialRatesDeleteMutationProps = inputObjectType({
  name: 'OfficialRatesDeleteMutationProps',
  definition(t) {
    t.nonNull.int('rate_ID')
  },
})

export const OfficialRatesDeleteMutation = extendType({
  type: 'OfficialRatesMutation',
  definition(t) {
    t.field('delete', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('OfficialRatesDeleteMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const { rate_ID } = props
        try {
          await prisma.rate.update({
            where: {
              rate_ID,
            },
            data: {
              rate_statusID: 14,
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
              description: 'Error while deleting rate',
            },
          }
        }
      },
    })
  },
})
