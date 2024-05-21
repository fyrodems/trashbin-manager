import { extendType, inputObjectType, nonNull } from 'nexus'

export const OfficialContractsArchivizeMutationProps = inputObjectType({
  name: 'OfficialContractsArchivizeMutationProps',
  definition(t) {
    t.nonNull.int('dumpsterContract_ID')
  },
})

export const OfficialContractsArchivizeMutation = extendType({
  type: 'OfficialContractsMutation',
  definition(t) {
    t.field('archivize', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('OfficialContractsArchivizeMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const { dumpsterContract_ID } = props
        try {
          await prisma.dumpster_Contract.update({
            where: {
              dumpsterContract_ID,
            },
            data: {
              dumpsterContract_dateTo: new Date().toISOString(),
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
              description: 'Error while archivizing contract',
            },
          }
        }
      },
    })
  },
})
