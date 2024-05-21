import { extendType, inputObjectType, nonNull } from 'nexus'

export const OfficialContractsAddMutationProps = inputObjectType({
  name: 'OfficialContractsAddMutationProps',
  definition(t) {
    t.nonNull.string('dumpsterContract_number')
    t.nonNull.int('dumpsterContract_dumpsterID')
    t.nonNull.string('dumpsterContract_dateFrom')
    t.nonNull.string('dumpsterContract_dateTo')
    t.nonNull.int('dumpsterContract_statusID')
    t.nonNull.int('dumpsterContract_communityID')
  },
})

export const OfficialContractsAddMutation = extendType({
  type: 'OfficialContractsMutation',
  definition(t) {
    t.field('add', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('OfficialContractsAddMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const {
          dumpsterContract_number,
          dumpsterContract_dumpsterID,
          dumpsterContract_dateFrom,
          dumpsterContract_dateTo,
          dumpsterContract_statusID,
          dumpsterContract_communityID,
        } = props

        try {
          // jeśli istnieje już kontrakt z tym numerem, nie zezwól na dodanie
          const sameDateContracts = await prisma.dumpster_Contract.findFirst({
            where: {
              dumpsterContract_number,
            },
          })

          if (sameDateContracts?.dumpsterContract_ID) {
            return {
              status: {
                message: 'Error',
                description: 'Kontrakt o takim numerze już istnieje!',
              },
            }
          }

          const lastContractID = await prisma.dumpster_Contract.findMany({
            orderBy: {
              dumpsterContract_ID: 'desc',
            },
            take: 1,
          })

          await prisma.dumpster_Contract.create({
            data: {
              dumpsterContract_ID: lastContractID[0]?.dumpsterContract_ID
                ? lastContractID[0].dumpsterContract_ID + 1
                : 1,
              dumpsterContract_number,
              dumpsterContract_dumpsterID,
              dumpsterContract_dateFrom: new Date(dumpsterContract_dateFrom),
              dumpsterContract_dateTo: new Date(dumpsterContract_dateTo),
              dumpsterContract_statusID,
              dumpsterContract_communityID,
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
              description: 'Error while creating contract',
            },
          }
        }
      },
    })
  },
})
