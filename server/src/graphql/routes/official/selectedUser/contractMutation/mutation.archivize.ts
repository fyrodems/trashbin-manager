import { extendType, inputObjectType, nonNull } from 'nexus'

export const OfficialUserContractsArchivizeMutationProps = inputObjectType({
  name: 'OfficialUserContractsArchivizeMutationProps',
  definition(t) {
    t.nonNull.int('usersContract_ID')
  },
})

export const OfficialUserContractsArchivizeMutation = extendType({
  type: 'OfficialUserContractsMutation',
  definition(t) {
    t.field('archivize', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('OfficialUserContractsArchivizeMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        try {
          await prisma.users_Contract.update({
            where: {
              usersContract_ID: props.usersContract_ID,
            },
            data: {
              usersContract_dateTo: new Date().toISOString(),
              usersContract_statusID: 16,
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
