import { extendType } from 'nexus'
import { loggedIn } from '@/utils/routeAuth'

export const UserDumpsterGetQuery = extendType({
  type: 'UserDumpsterQuery',
  definition(t) {
    t.list.nonNull.field('get', {
      type: 'DumpsterInfoType',
      authorize: loggedIn(),
      async resolve(_parent, _args, { user, prisma }) {
        if (!user) {
          throw new TypeError('Unauthorized')
        }

        const userCards = await prisma.users_Cards.findMany({
          where: {
            usersCards_userID: user.users_ID,
            // Liczymy jedynie aktywne karty
            usersCards_statusID: 4,
          },
        })

        // Sprawdzamy, które śmietniki są połączone z aktywnymi kartami
        const userDumpstersIDs: number[] = []
        for (const card of userCards) {
          const dumpstersIDs: string = card?.usersCards_dumpstersIDs
          const dumpstersArray: string[] = dumpstersIDs.split(';')
          const connectedDumpsters = dumpstersArray
            .map(Number)
            .filter((id) => id !== 0)
          for (const dumpsterID of connectedDumpsters) {
            userDumpstersIDs.push(dumpsterID)
          }
        }

        const dumpsters = await prisma.dumpster.findMany({
          where: {
            AND: [
              { dumpster_statusID: 27 },
              { dumpster_ID: { in: userDumpstersIDs } },
            ],
          },
        })

        // pobieramy aktywne kontrakty związane z tymi altany śmietnikowejmi

        const dumpsterContracts = await prisma.dumpster_Contract.findMany({
          where: {
            AND: [
              { dumpsterContract_dumpsterID: { in: userDumpstersIDs } },
              { dumpsterContract_statusID: 15 },
            ],
          },
        })
        const dumpstersContractsIDs = dumpsterContracts.map(
          (d) => d.dumpsterContract_ID
        )
        // pobieramy stawki z wyszukanych kontraktów, aby kazdy smietnik mial stawke na kazdy rodzaj śmiecia
        const rates = await prisma.rate.findMany({
          where: {
            AND: [
              { rate_dumpsterContractID: { in: dumpstersContractsIDs } },
              { rate_statusID: 13 },
            ],
          },
        })

        // przypisujemy poszczególne stawki do konkretnych kontraktów
        const contractsRates = dumpsterContracts.map((c) => {
          return {
            ...c,
            rates: rates.filter(
              (r) => r.rate_dumpsterContractID === c.dumpsterContract_ID
            ),
          }
        })

        // przypisujemy poszczegolne kontrakty do smientikow
        const dumpstersContracts = dumpsters.map((d) => {
          return {
            ...d,
            contracts: contractsRates
              .filter((c) => c.dumpsterContract_dumpsterID === d.dumpster_ID)
              .map((c) => ({
                ...c,
                dumpsterContract_dateFrom:
                  c.dumpsterContract_dateFrom.toISOString(),
                dumpsterContract_dateTo:
                  c.dumpsterContract_dateTo.toISOString(),
              })),
          }
        })

        return dumpstersContracts as Array<{
          dumpster_ID: number
          dumpster_name: string
          dumpster_description: string
          dumpster_street: string
          dumpster_city: string
          dumpster_postCode: string
          dumpster_communityID: number
          dumpster_houseNumbers: string
          dumpster_hasError: boolean
          dumpster_statusID: number
          contracts: Array<{
            dumpsterContract_ID: number
            dumpsterContract_number: string
            dumpsterContract_dumpsterID: number
            dumpsterContract_dateFrom: string
            dumpsterContract_dateTo: string
            dumpsterContract_statusID: number
            dumpsterContract_communityID: number
            rates: Array<{
              rate_ID: number
              rate_typeID: number
              rate_dumpsterContractID?: number
              rate_userContractID?: number
              rate_value: number
              rate_statusID: number
            }>
          }>
        }>
      },
    })
  },
})
