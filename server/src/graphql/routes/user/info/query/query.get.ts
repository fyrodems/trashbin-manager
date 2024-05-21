import { extendType } from 'nexus'
import { loggedIn } from '@/utils/routeAuth'

export const UserInfoGetQuery = extendType({
  type: 'UserInfoQuery',
  definition(t) {
    t.field('get', {
      type: 'OfficialSelectedUserDataType',
      authorize: loggedIn(),
      async resolve(_parent, _args, { user, prisma }) {
        if (!user) {
          throw new TypeError('Unauthorized')
        }

        // WYBRANY UZYTKOWNIK

        const selectedUser = await prisma.users.findUnique({
          where: {
            users_ID: user.users_ID,
          },
        })

        // JEŚLI NIE MA UZYTKOWNIKA, WYRZUĆ BŁĄD
        if (!selectedUser) {
          throw new TypeError('Unauthorized')
        }

        // JEGO DANE ADRESOWE
        const addresses = await prisma.users_Address.findMany({
          where: {
            AND: [
              { usersAddress_userID: selectedUser.users_ID },
              { usersAddress_statusID: 24 },
            ],
          },
        })

        const addressesList = addresses.map((address) => ({
          usersAddress_ID: address.usersAddress_ID,
          usersAddress_userID: address.usersAddress_userID,
          usersAddress_street: address.usersAddress_street,
          usersAddress_houseNumber: address.usersAddress_houseNumber,
          usersAddress_apartamentNumber: address.usersAddress_apartamentNumber,
          usersAddress_postCode: address.usersAddress_postCode,
          usersAddress_city: address.usersAddress_city,
          usersAddress_typeID: address.usersAddress_typeID,
          usersAddress_communityID: address.usersAddress_communityID,
          usersAddress_statusID: address.usersAddress_statusID,
        }))

        // JEGO KARTY
        const cardsList = await prisma.users_Cards.findMany({
          where: {
            usersCards_userID: selectedUser.users_ID,
          },
        })

        // JEGO ŚMIETNIKI
        const activeCards = await prisma.users_Cards.findMany({
          where: {
            usersCards_userID: selectedUser.users_ID,
            // Liczymy śmietniki jedynie z aktywnych kart
            usersCards_statusID: 4,
          },
        })

        //  śmietniki dodane do istniejących kart
        const dumpsterToCardApplications =
          await prisma.dumpsters_Applications.findMany({
            where: {
              dumpstersApplications_userID: user.users_ID,
            },
          })

        // Sprawdzamy, które śmietniki są połączone z aktywnymi kartami
        const userDumpstersIDs: number[] = []
        for (const card of activeCards) {
          const dumpstersIDs: string = card?.usersCards_dumpstersIDs
          const dumpstersArray: string[] = dumpstersIDs
            .split(';')
            .concat(
              dumpsterToCardApplications.map((d) =>
                d.dumpstersApplications_dumpsterID.toString()
              )
            )

          const connectedDumpsters = dumpstersArray
            .map(Number)
            .filter((id) => id !== 0)

          for (const dumpsterID of connectedDumpsters) {
            userDumpstersIDs.push(dumpsterID)
          }
        }

        const dumpstersList = await prisma.dumpster.findMany({
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
        const dumpsterRates = await prisma.rate.findMany({
          where: {
            rate_dumpsterContractID: { in: dumpstersContractsIDs },
          },
        })

        // przypisujemy poszczególne stawki do konkretnych kontraktów
        const contractsRates = dumpsterContracts.map((c) => {
          return {
            ...c,
            rates: dumpsterRates.filter(
              (r) => r.rate_dumpsterContractID === c.dumpsterContract_ID
            ),
          }
        })

        // przypisujemy poszczegolne kontrakty do smientikow
        const dumpstersContracts = dumpstersList.map((d) => {
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

        // przypisujemy kubły do śmietników

        const bins = await prisma.dumpster_Bin.findMany({
          where: {
            dumpsterBin_dumpsterID: {
              in: dumpstersContracts.map((d) => d.dumpster_ID),
            },
          },
        })

        const dumpstersBins = dumpstersContracts.map((d) => {
          return {
            ...d,
            bins: bins.filter(
              (b) => b.dumpsterBin_dumpsterID === d.dumpster_ID
            ),
          }
        })

        const cardsWithDumpsters = cardsList.map((c) => {
          const dumpstersIDs: string = c?.usersCards_dumpstersIDs
          const dumpstersArray: string[] = dumpstersIDs.split(';')
          const connectedDumpsters = dumpstersArray
            .map(Number)
            .filter((id) => id !== 0)

          return {
            ...c,
            dumpsters: connectedDumpsters
              // eslint-disable-next-line unicorn/prefer-array-find
              .map((d) => dumpstersBins.filter((k) => k.dumpster_ID === d)[0])
              .filter((c) => c !== undefined),
          }
        })
        // JEGO KONTRAKTY
        // dodajemy jedynie kontrakty z gminy urzędnika
        const contractsList = await prisma.users_Contract.findMany({
          where: {
            AND: [{ usersContract_userID: selectedUser.users_ID }],
          },
        })

        const contractsListResult = contractsList.map((contract) => ({
          ...contract,
          usersContract_dateFrom: contract.usersContract_dateFrom.toISOString(),
          usersContract_dateTo: contract.usersContract_dateTo.toISOString(),
        }))

        // przypisujemy do tych kontraktów stawki za poszczególne rodzaje śmieci
        const contractsIDs = contractsListResult.map(
          (contract) => contract.usersContract_ID
        )
        const userRates = await prisma.rate.findMany({
          where: {
            AND: [
              {
                rate_userContractID: {
                  in: contractsIDs,
                },
              },
              { rate_statusID: 13 },
            ],
          },
        })

        const contractsWithRates = contractsListResult.map((contract) => {
          return {
            ...contract,
            rates: {
              paper: userRates.find(
                (rate) =>
                  rate.rate_userContractID === contract.usersContract_ID &&
                  rate.rate_typeID === 11
              )?.rate_value,
              plastic: userRates.find(
                (rate) =>
                  rate.rate_userContractID === contract.usersContract_ID &&
                  rate.rate_typeID === 12
              )?.rate_value,
              glass: userRates.find(
                (rate) =>
                  rate.rate_userContractID === contract.usersContract_ID &&
                  rate.rate_typeID === 13
              )?.rate_value,
              bio: userRates.find(
                (rate) =>
                  rate.rate_userContractID === contract.usersContract_ID &&
                  rate.rate_typeID === 14
              )?.rate_value,
              mixed: userRates.find(
                (rate) =>
                  rate.rate_userContractID === contract.usersContract_ID &&
                  rate.rate_typeID === 15
              )?.rate_value,
            },
          }
        })

        // jeśli uzytkownik należy do spółdzielni (posiada jej kartę z przypisaną altaną), dodaj umowy obowiązujące dla lokatorów spóldzielni
        const rentedCards = await prisma.users_Cards.findMany({
          where: {
            AND: [
              { usersCards_rentedToUserID: user.users_ID },
              { usersCards_statusID: 4 },
            ],
          },
        })

        let dumpsterContractsWithRates: Array<{
          rates: {
            paper: number | undefined
            plastic: number | undefined
            glass: number | undefined
            bio: number | undefined
            mixed: number | undefined
          }
          dumpsterContract_ID: number
          dumpsterContract_number: string
          dumpsterContract_dumpsterID: number
          dumpsterContract_dateFrom: string
          dumpsterContract_dateTo: string
          dumpsterContract_statusID: number
          dumpsterContract_communityID: number
        }> = []

        if (rentedCards.length > 0) {
          const rentedCardsDumpstersIDs: number[] = []
          for (const card of rentedCards) {
            const dumpstersIDs: string = card?.usersCards_dumpstersIDs
            const dumpstersArray: string[] = dumpstersIDs.split(';')
            const connectedDumpsters = dumpstersArray
              .map(Number)
              .filter((id) => id !== 0)
            for (const dumpsterID of connectedDumpsters) {
              rentedCardsDumpstersIDs.push(dumpsterID)
            }
          }

          const dumpsterContracts = await prisma.dumpster_Contract.findMany({
            where: {
              AND: [
                {
                  dumpsterContract_dumpsterID: { in: rentedCardsDumpstersIDs },
                },
                { dumpsterContract_statusID: 15 },
              ],
            },
          })

          const dumpsterContractsRates = await prisma.rate.findMany({
            where: {
              AND: [
                {
                  rate_userContractID: {
                    in: dumpsterContracts.map(
                      (contract) => contract.dumpsterContract_ID
                    ),
                  },
                },
                { rate_statusID: 13 },
              ],
            },
          })

          dumpsterContractsWithRates = dumpsterContracts.map((contract) => {
            const contractRates = dumpsterContractsRates.filter(
              (rate) =>
                rate.rate_dumpsterContractID === contract.dumpsterContract_ID
            )

            const ratePaper = contractRates.find(
              (rate) => rate.rate_typeID === 11
            )
            const ratePlastic = contractRates.find(
              (rate) => rate.rate_typeID === 13
            )
            const rateGlass = contractRates.find(
              (rate) => rate.rate_typeID === 14
            )
            const rateBio = contractRates.find(
              (rate) => rate.rate_typeID === 12
            )
            const rateMixed = contractRates.find(
              (rate) => rate.rate_typeID === 15
            )

            return {
              ...contract,
              dumpsterContract_dateFrom:
                contract.dumpsterContract_dateFrom.toISOString(),
              dumpsterContract_dateTo:
                contract.dumpsterContract_dateTo.toISOString(),
              rates: {
                paper: ratePaper?.rate_value,
                plastic: ratePlastic?.rate_value,
                glass: rateGlass?.rate_value,
                bio: rateBio?.rate_value,
                mixed: rateMixed?.rate_value,
              },
            }
          })
        }

        const contractsResult = {
          userContracts: contractsWithRates,
          housingAssociationContracts: dumpsterContractsWithRates,
        }

        const userData = {
          userType: user.users_typeID,
          basicInfo: selectedUser,
          addressInfo: addressesList,
          cards: cardsWithDumpsters,
          dumpsters: dumpstersBins,
          contracts: contractsResult,
        }

        return userData
      },
    })
  },
})
