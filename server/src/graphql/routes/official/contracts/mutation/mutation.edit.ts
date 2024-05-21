import { extendType, inputObjectType, nonNull } from 'nexus'

export const OfficialContractsEditMutationProps = inputObjectType({
  name: 'OfficialContractsEditMutationProps',
  definition(t) {
    t.nonNull.int('dumpsterContract_ID')
    t.nonNull.string('dumpsterContract_dateFrom')
    t.nonNull.string('dumpsterContract_dateTo')
    t.nonNull.int('dumpsterContract_statusID')
    t.nonNull.int('dumpsterContract_dumpsterID')
  },
})

export const OfficialContractsEditMutation = extendType({
  type: 'OfficialContractsMutation',
  definition(t) {
    t.field('edit', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('OfficialContractsEditMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const {
          dumpsterContract_ID,
          dumpsterContract_dateFrom,
          dumpsterContract_dateTo,
          dumpsterContract_statusID,
          dumpsterContract_dumpsterID,
        } = props
        try {
          await prisma.dumpster_Contract.update({
            where: {
              dumpsterContract_ID,
            },
            data: {
              dumpsterContract_dateFrom: new Date(
                dumpsterContract_dateFrom
              ).toISOString(),
              dumpsterContract_dateTo: new Date(
                dumpsterContract_dateTo
              ).toISOString(),
              dumpsterContract_statusID,
              dumpsterContract_dumpsterID,
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
