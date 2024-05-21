import { extendType, inputObjectType, nonNull } from 'nexus'

export const OfficialRatesAddMutationProps = inputObjectType({
  name: 'OfficialRatesAddMutationProps',
  definition(t) {
    t.nonNull.float('rate_value')
    t.nonNull.int('rate_typeID')
    t.nonNull.int('rate_dumpsterContractID')
  },
})

export const OfficialRatesAddMutation = extendType({
  type: 'OfficialRatesMutation',
  definition(t) {
    t.field('add', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('OfficialRatesAddMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const { rate_value, rate_typeID, rate_dumpsterContractID } = props
        try {
          // jeśli do altany przypisany jest aktywny kontrakt na wywóz tego rodzaju śmiecia, nie zezwól na dodanie

          // znajdz altanę, do której dodajemy stawki
          const contract = await prisma.dumpster_Contract.findUnique({
            where: {
              dumpsterContract_ID: rate_dumpsterContractID,
            },
          })

          const dumpster = await prisma.dumpster.findUnique({
            where: {
              dumpster_ID: contract?.dumpsterContract_dumpsterID,
            },
          })

          // znajdź wszystkie aktywne konktrakty przypisane do danej altany
          const dumpsterContracts = await prisma.dumpster_Contract.findMany({
            where: {
              AND: [
                { dumpsterContract_dumpsterID: dumpster?.dumpster_ID },
                { dumpsterContract_statusID: 15 },
              ],
            },
          })

          // znajdź wszystkie stawki tych kontraktów

          const contractRates = await prisma.rate.findMany({
            where: {
              AND: [
                { rate_statusID: 13 },
                {
                  rate_dumpsterContractID: {
                    in: dumpsterContracts.map(
                      (contract) => contract.dumpsterContract_ID
                    ),
                  },
                },
              ],
            },
          })

          const contractRatesTypes = contractRates.map(
            (rate) => rate.rate_typeID
          )

          if (contractRatesTypes.includes(rate_typeID)) {
            return {
              status: {
                message: 'Error',
                description:
                  'Altana ma już przypisaną stawkę na ten rodzaj śmiecia',
              },
            }
          }

          const lastRateID = await prisma.rate.findMany({
            orderBy: {
              rate_ID: 'desc',
            },
            take: 1,
          })

          await prisma.rate.create({
            data: {
              rate_ID: lastRateID[0]?.rate_ID ? lastRateID[0].rate_ID + 1 : 1,
              rate_value,
              rate_typeID,
              rate_dumpsterContractID,
              rate_userContractID: null,
              rate_statusID: 13,
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
              description: 'Error while creating rate',
            },
          }
        }
      },
    })
  },
})
