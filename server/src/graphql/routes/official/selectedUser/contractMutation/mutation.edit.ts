import { extendType, inputObjectType, nonNull } from 'nexus'

export const OfficialUserContractsEditMutationProps = inputObjectType({
  name: 'OfficialUserContractsEditMutationProps',
  definition(t) {
    t.nonNull.int('usersContract_ID')
    t.nonNull.string('usersContract_dateFrom')
    t.nonNull.string('usersContract_dateTo')
    t.nonNull.int('usersContract_statusID')
    t.nonNull.string('usersContract_number')
    t.nonNull.float('usersContract_ratePaper')
    t.nonNull.float('usersContract_ratePlastic')
    t.nonNull.float('usersContract_rateGlass')
    t.nonNull.float('usersContract_rateBio')
    t.nonNull.float('usersContract_rateMixed')
  },
})

export const OfficialUserContractsEditMutation = extendType({
  type: 'OfficialUserContractsMutation',
  definition(t) {
    t.field('edit', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('OfficialUserContractsEditMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const {
          usersContract_ID,
          usersContract_dateFrom,
          usersContract_dateTo,
          usersContract_statusID,
          usersContract_number,
          usersContract_ratePaper,
          usersContract_ratePlastic,
          usersContract_rateGlass,
          usersContract_rateBio,
          usersContract_rateMixed,
        } = props
        try {
          // aktualizujemy umowe
          await prisma.users_Contract.update({
            where: {
              usersContract_ID,
            },
            data: {
              usersContract_dateFrom: new Date(
                usersContract_dateFrom
              ).toISOString(),
              usersContract_dateTo: new Date(
                usersContract_dateTo
              ).toISOString(),
              usersContract_statusID,
              usersContract_number,
            },
          })

          // jeśli umowa mimała już przypisane stawki, to je edytujemy, w przeciwnym razie tworzymy nowe stawki
          const rates = await prisma.rate.findMany({
            where: {
              AND: [
                { rate_userContractID: usersContract_ID },
                { rate_statusID: 13 },
              ],
            },
          })

          const lastRateID = await prisma.rate.findMany({
            orderBy: {
              rate_ID: 'desc',
            },
            take: 1,
          })
          if (rates.length === 0) {
            await prisma.rate.create({
              data: {
                rate_ID: lastRateID[0]?.rate_ID ? lastRateID[0].rate_ID + 1 : 1,
                rate_value: usersContract_ratePaper,
                rate_dumpsterContractID: null,
                rate_typeID: 11,
                rate_statusID: 13,
                rate_userContractID: usersContract_ID,
              },
            })
            await prisma.rate.create({
              data: {
                rate_ID: lastRateID[0]?.rate_ID ? lastRateID[0].rate_ID + 2 : 2,
                rate_value: usersContract_ratePlastic,
                rate_dumpsterContractID: null,
                rate_typeID: 13,
                rate_statusID: 13,
                rate_userContractID: usersContract_ID,
              },
            })
            await prisma.rate.create({
              data: {
                rate_ID: lastRateID[0]?.rate_ID ? lastRateID[0].rate_ID + 3 : 3,
                rate_value: usersContract_rateGlass,
                rate_dumpsterContractID: null,
                rate_typeID: 14,
                rate_statusID: 13,
                rate_userContractID: usersContract_ID,
              },
            })
            await prisma.rate.create({
              data: {
                rate_ID: lastRateID[0]?.rate_ID ? lastRateID[0].rate_ID + 4 : 4,
                rate_value: usersContract_rateBio,
                rate_dumpsterContractID: null,
                rate_typeID: 12,
                rate_statusID: 13,
                rate_userContractID: usersContract_ID,
              },
            })
            await prisma.rate.create({
              data: {
                rate_ID: lastRateID[0]?.rate_ID ? lastRateID[0].rate_ID + 5 : 5,
                rate_value: usersContract_rateMixed,
                rate_dumpsterContractID: null,
                rate_typeID: 15,
                rate_statusID: 13,
                rate_userContractID: usersContract_ID,
              },
            })
          } else if (rates.length === 5) {
            for await (const rate of rates) {
              switch (rate.rate_typeID) {
                case 11: {
                  await prisma.rate.update({
                    where: {
                      rate_ID: rate.rate_ID,
                    },
                    data: {
                      rate_value: usersContract_ratePaper,
                    },
                  })

                  break
                }

                case 12: {
                  await prisma.rate.update({
                    where: {
                      rate_ID: rate.rate_ID,
                    },
                    data: {
                      rate_value: usersContract_rateBio,
                    },
                  })

                  break
                }

                case 13: {
                  await prisma.rate.update({
                    where: {
                      rate_ID: rate.rate_ID,
                    },
                    data: {
                      rate_value: usersContract_ratePlastic,
                    },
                  })

                  break
                }

                case 14: {
                  await prisma.rate.update({
                    where: {
                      rate_ID: rate.rate_ID,
                    },
                    data: {
                      rate_value: usersContract_rateGlass,
                    },
                  })

                  break
                }

                case 15: {
                  await prisma.rate.update({
                    where: {
                      rate_ID: rate.rate_ID,
                    },
                    data: {
                      rate_value: usersContract_rateMixed,
                    },
                  })

                  break
                }
                // No default
              }
            }
          }

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
