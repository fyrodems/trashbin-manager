import { extendType, inputObjectType, nonNull } from 'nexus'

export const OfficialRatesEditMutationProps = inputObjectType({
  name: 'OfficialRatesEditMutationProps',
  definition(t) {
    t.nonNull.int('rate_ID')
    t.nonNull.float('rate_value')
    t.nonNull.int('rate_typeID')
  },
})

export const OfficialRatesEditMutation = extendType({
  type: 'OfficialRatesMutation',
  definition(t) {
    t.field('edit', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('OfficialRatesEditMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const { rate_ID, rate_value, rate_typeID } = props
        try {
          await prisma.rate.update({
            where: {
              rate_ID,
            },
            data: {
              rate_value,
              rate_typeID,
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
              description: 'Error while editing contract',
            },
          }
        }
      },
    })
  },
})
