import { extendType, inputObjectType, nonNull } from 'nexus'

export const OfficialContractsDeleteMutationProps = inputObjectType({
  name: 'OfficialContractsDeleteMutationProps',
  definition(t) {
    t.nonNull.int('dumpsterContract_ID')
  },
})

export const OfficialContractsDeleteMutation = extendType({
  type: 'OfficialContractsMutation',
  definition(t) {
    t.field('delete', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('OfficialContractsDeleteMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const { dumpsterContract_ID } = props
        try {
          // kontrakt archiwizujemy

          await prisma.dumpster_Contract.update({
            where: {
              dumpsterContract_ID,
            },
            data: {
              dumpsterContract_statusID: 16,
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
              description: 'Error while deleting contract',
            },
          }
        }
      },
    })
  },
})
