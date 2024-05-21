import { extendType } from 'nexus'

export const OfficialDumpstersGetQueryResult = extendType({
  type: 'OfficialDumpstersQuery',
  definition(t) {
    t.list.nonNull.field('get', {
      type: 'DumpsterInfoType',
      async resolve(_parent, _, { user, prisma }) {
        if (!user) {
          throw new TypeError('Unauthorized')
        }

        if (user.users_typeID === 5 || user.users_typeID === 6) {
          const officialAddress = await prisma.users_Address.findFirst({
            where: {
              AND: [
                { usersAddress_userID: user.users_ID },
                { usersAddress_statusID: 24 },
              ],
            },
          })

          const officialCommunityID = officialAddress?.usersAddress_communityID

          // sprawdzamy, ktore altany maja wlascicieli, a wiec nie przynaleza do gminy
          const dumpstersWOwners = await prisma.dumpster_Owners.findMany({
            where: { dumpsterOwners_statusID: 17 },
          })
          const ownedDumpstersIDs = dumpstersWOwners.map(
            (d) => d.dumpsterOwners_dumpsterID
          )
          // pobieramy dane smietnikow, ktore naleza do gminy
          const dumpstersInCommunity = await prisma.dumpster.findMany({
            where: {
              AND: [
                { dumpster_statusID: 27 },
                { dumpster_communityID: officialCommunityID },
                { NOT: { dumpster_ID: { in: ownedDumpstersIDs } } },
              ],
            },
          })

          // pobieramy aktywne kontrakty związane z tymi altany śmietnikowejmi

          const dumpsterContracts = await prisma.dumpster_Contract.findMany({
            where: {
              AND: [
                {
                  dumpsterContract_dumpsterID: {
                    in: dumpstersInCommunity.map((d) => d.dumpster_ID),
                  },
                },
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
          const dumpstersContracts = dumpstersInCommunity.map((d) => {
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

          // wyszukujemy jaki układ kubłów ma dana altana
          const binsInCommunity = await prisma.dumpster_Bin.findMany({
            where: {
              dumpsterBin_dumpsterID: {
                in: dumpstersInCommunity.map((d) => d.dumpster_ID),
              },
            },
          })

          const dumpstersFullData = dumpstersContracts.map((d) => {
            return {
              ...d,
              bins: binsInCommunity.filter(
                (b) => b.dumpsterBin_dumpsterID === d.dumpster_ID
              ),
            }
          })

          return dumpstersFullData as Array<{
            dumpster_ID: number
            dumpster_name: string
            dumpster_description?: string
            dumpster_street: string
            dumpster_city: string
            dumpster_postCode: string
            dumpster_communityID: number
            dumpster_houseNumbers: string
            dumpster_hasError: boolean
            dumpster_statusID: number
            bins: Array<{
              dumpsterBin_ID: number
              dumpsterBin_dumpsterID: number
              dumpsterBin_isFull: boolean
              dumpsterBin_typeID: number
            }>
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
        }

        throw new TypeError('Unauthorized')
      },
    })
  },
})
