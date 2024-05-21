import { extendType, inputObjectType, nonNull } from 'nexus'

export const OfficialUserContractsAddMutationProps = inputObjectType({
  name: 'OfficialUserContractsAddMutationProps',
  definition(t) {
    t.nonNull.int('usersContract_userID')
    t.nonNull.string('usersContract_number')
    t.nonNull.string('usersContract_dateFrom')
    t.nonNull.string('usersContract_dateTo')
    t.nonNull.int('usersContract_statusID')
    t.nonNull.int('usersContract_communityID')
    t.nonNull.float('usersContract_ratePaper')
    t.nonNull.float('usersContract_ratePlastic')
    t.nonNull.float('usersContract_rateGlass')
    t.nonNull.float('usersContract_rateBio')
    t.nonNull.float('usersContract_rateMixed')
  },
})

export const OfficialUserContractsAddMutation = extendType({
  type: 'OfficialUserContractsMutation',
  definition(t) {
    t.field('add', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('OfficialUserContractsAddMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const {
          usersContract_userID,
          usersContract_dateFrom,
          usersContract_dateTo,
          usersContract_statusID,
          usersContract_communityID,
          usersContract_number,
          usersContract_ratePaper,
          usersContract_ratePlastic,
          usersContract_rateGlass,
          usersContract_rateBio,
          usersContract_rateMixed,
        } = props
        try {
          // jeśli istnieje już kontrakt z tym numerem, nie zezwól na dodanie
          const sameNumberContracts = await prisma.users_Contract.findFirst({
            where: {
              usersContract_number,
            },
          })

          if (sameNumberContracts?.usersContract_ID) {
            throw new Error('Kontrakt o takim numerze już istnieje!')
          }

          const lastContractID = await prisma.users_Contract.findMany({
            orderBy: {
              usersContract_ID: 'desc',
            },
            take: 1,
          })

          const newContract = await prisma.users_Contract.create({
            data: {
              usersContract_ID: lastContractID[0]?.usersContract_ID
                ? lastContractID[0].usersContract_ID + 1
                : 1,
              usersContract_userID,
              usersContract_number,
              usersContract_dateFrom: new Date(usersContract_dateFrom),
              usersContract_dateTo: new Date(usersContract_dateTo),
              usersContract_statusID,
              usersContract_communityID,
            },
          })

          const lastRateID = await prisma.rate.findMany({
            orderBy: {
              rate_ID: 'desc',
            },
            take: 1,
          })

          await prisma.rate.create({
            data: {
              rate_ID: lastRateID[0]?.rate_ID ? lastRateID[0].rate_ID + 1 : 1,
              rate_value: usersContract_ratePaper,
              rate_dumpsterContractID: null,
              rate_typeID: 11,
              rate_statusID: 13,
              rate_userContractID: newContract.usersContract_ID,
            },
          })
          await prisma.rate.create({
            data: {
              rate_ID: lastRateID[0]?.rate_ID ? lastRateID[0].rate_ID + 2 : 2,
              rate_value: usersContract_ratePlastic,
              rate_dumpsterContractID: null,
              rate_typeID: 13,
              rate_statusID: 13,
              rate_userContractID: newContract.usersContract_ID,
            },
          })
          await prisma.rate.create({
            data: {
              rate_ID: lastRateID[0]?.rate_ID ? lastRateID[0].rate_ID + 3 : 3,
              rate_value: usersContract_rateGlass,
              rate_dumpsterContractID: null,
              rate_typeID: 14,
              rate_statusID: 13,
              rate_userContractID: newContract.usersContract_ID,
            },
          })
          await prisma.rate.create({
            data: {
              rate_ID: lastRateID[0]?.rate_ID ? lastRateID[0].rate_ID + 4 : 4,
              rate_value: usersContract_rateBio,
              rate_dumpsterContractID: null,
              rate_typeID: 12,
              rate_statusID: 13,
              rate_userContractID: newContract.usersContract_ID,
            },
          })
          await prisma.rate.create({
            data: {
              rate_ID: lastRateID[0]?.rate_ID ? lastRateID[0].rate_ID + 5 : 5,
              rate_value: usersContract_rateMixed,
              rate_dumpsterContractID: null,
              rate_typeID: 15,
              rate_statusID: 13,
              rate_userContractID: newContract.usersContract_ID,
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
