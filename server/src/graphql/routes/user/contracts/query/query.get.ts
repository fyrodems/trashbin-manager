/* eslint-disable no-warning-comments */
import { extendType } from 'nexus'
import {
  type HousingAssociationContractsQueryType,
  type HousingAssociationContractsType,
  type UserContractsQueryType,
  type UserContractsResultType,
} from './types'
import { mergeRatesWithTheSameContractIDs } from './utils'
import { loggedIn } from '@/utils/routeAuth'

export const UserContractGetQuery = extendType({
  type: 'UserContractQuery',
  definition(t) {
    t.nonNull.field('get', {
      type: 'UserContractType',
      authorize: loggedIn(),
      async resolve(_parent, _args, { user, prisma }) {
        if (!user) {
          throw new TypeError('Unauthorized')
        }

        const userContractsQuery: UserContractsQueryType[] =
          await prisma.$queryRaw`
        SELECT Users_Contract.*, Rate.rate_typeID, Rate.rate_value
          FROM Users_Contract
          JOIN Rate ON Rate.rate_userContractID = usersContract_ID
          WHERE usersContract_userID = ${user.users_ID}`

        const contractsResultData: UserContractsResultType[] =
          userContractsQuery.map((contract) => {
            return {
              usersContract_ID: contract.usersContract_ID,
              usersContract_number: contract.usersContract_number,
              usersContract_userID: contract.usersContract_userID,
              usersContract_statusID: contract.usersContract_statusID,
              usersContract_dateFrom: new Date(
                contract.usersContract_dateFrom
              ).toISOString(),
              usersContract_dateTo: new Date(
                contract.usersContract_dateTo
              ).toISOString(),
              usersContract_communityID: contract.usersContract_communityID,
              rates: {
                paper:
                  contract.rate_typeID === 11 ? contract.rate_value : undefined,
                plastic:
                  contract.rate_typeID === 13 ? contract.rate_value : undefined,
                glass:
                  contract.rate_typeID === 14 ? contract.rate_value : undefined,
                bio:
                  contract.rate_typeID === 12 ? contract.rate_value : undefined,
                mixed:
                  contract.rate_typeID === 15 ? contract.rate_value : undefined,
              },
            }
          })

        const mergedContractsResultData =
          mergeRatesWithTheSameContractIDs(contractsResultData)

        const housingAssociationQuery: HousingAssociationContractsQueryType[] =
          await prisma.$queryRaw`
        SELECT Dumpster_Contract.*, Rate.rate_typeID, Rate.rate_value
          FROM Users_Cards
          JOIN Dumpster_Contract ON Dumpster_Contract.dumpsterContract_dumpsterID LIKE Users_Cards.usersCards_dumpstersIDs
          JOIN Rate ON Rate.rate_userContractID = Dumpster_Contract.dumpsterContract_ID
          WHERE Users_Cards.usersCards_rentedToUserID = ${user.users_ID} AND Users_Cards.usersCards_statusID = 4 AND Dumpster_Contract.dumpsterContract_statusID = 15 AND Rate.rate_statusID = 13;`

        const housingAssociationQueryData: HousingAssociationContractsType[] =
          housingAssociationQuery.map((contract) => {
            return {
              dumpsterContract_ID: contract.dumpsterContract_ID,
              dumpsterContract_communityID:
                contract.dumpsterContract_communityID,
              dumpsterContract_dateFrom: new Date(
                contract.dumpsterContract_dateFrom
              ).toISOString(),
              dumpsterContract_dateTo: new Date(
                contract.dumpsterContract_dateTo
              ).toISOString(),
              dumpsterContract_number: contract.dumpsterContract_number,
              dumpsterContract_statusID: contract.dumpsterContract_statusID,
              dumpsterContract_dumpsterID: contract.dumpsterContract_dumpsterID,
              rates: {
                paper:
                  contract.rate_typeID === 11 ? contract.rate_value : undefined,
                plastic:
                  contract.rate_typeID === 13 ? contract.rate_value : undefined,
                glass:
                  contract.rate_typeID === 14 ? contract.rate_value : undefined,
                bio:
                  contract.rate_typeID === 12 ? contract.rate_value : undefined,
                mixed:
                  contract.rate_typeID === 15 ? contract.rate_value : undefined,
              },
            }
          })

        const mergedHousingAssociationContractsResultData =
          mergeRatesWithTheSameContractIDs(housingAssociationQueryData)

        // TODO Wyłączyć Type assertion
        const contractsResult = {
          userContracts: mergedContractsResultData as UserContractsResultType[],
          housingAssociationContracts:
            mergedHousingAssociationContractsResultData as HousingAssociationContractsType[],
        }

        return contractsResult
      },
    })
  },
})
