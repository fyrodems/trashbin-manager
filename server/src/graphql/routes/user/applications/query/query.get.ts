import { extendType } from 'nexus'
import { loggedIn } from '@/utils/routeAuth'

export const UserApplicationsGetQuery = extendType({
  type: 'UserApplicationsQuery',
  definition(t) {
    t.field('get', {
      type: 'UserApplicationsType',
      authorize: loggedIn(),
      async resolve(_parent, _args, { user, prisma }) {
        if (!user) {
          throw new TypeError('Unauthorized')
        }

        const cardsApplications = await prisma.cards_Applications.findMany({
          where: {
            cardsApplications_userID: user.users_ID,
          },
        })

        const cardsApplicationsResult = cardsApplications.map((c) => {
          return {
            ...c,
            cardsApplications_dateAdded:
              c.cardsApplications_dateAdded.toISOString(),
            cardsApplications_dateReviewed:
              c.cardsApplications_dateReviewed?.toISOString(),
          }
        })

        // przypisane do tych kart smietniki oraz śmietniki dodane do istniejących kart
        const applicationsWithDumpsters = cardsApplicationsResult.map(
          (application) => {
            return {
              applicationID: application.cardsApplications_ID,
              applicationDumpsters:
                application.cardsApplications_dumpstersIDs.split(';'),
            }
          }
        )

        //  śmietniki dodane do istniejących kart
        const dumpsterToCardApplications =
          await prisma.dumpsters_Applications.findMany({
            where: {
              dumpstersApplications_userID: user.users_ID,
            },
          })

        const dumpstersArrays = applicationsWithDumpsters
          .map((a) => a.applicationDumpsters)
          .concat(
            dumpsterToCardApplications.map((d) => [
              d.dumpstersApplications_dumpsterID.toString(),
            ])
          )

        const dumpstersIDs: number[] = []
        for (const array of dumpstersArrays)
          for (const id of array) dumpstersIDs.push(Number(id))

        const cardApplicationsWDumpsters = cardsApplications.map((c) => {
          return {
            ...c,
            cardsApplications_dateAdded:
              c.cardsApplications_dateAdded.toISOString(),
            cardsApplications_dateReviewed:
              c.cardsApplications_dateReviewed?.toISOString(),
            dumpstersIDs: applicationsWithDumpsters
              .filter((d) => d.applicationID === c.cardsApplications_ID)
              .map((d) => d.applicationDumpsters)[0]
              .map(Number),
          }
        })

        const userData = await prisma.users.findUnique({
          where: {
            users_ID: user.users_ID,
          },
        })

        if (!userData) {
          throw new Error('Nie znaleziono danych użytkownika')
        }

        const cardResult = cardApplicationsWDumpsters.map((c) => {
          return {
            ...c,
          }
        })

        const addressApplications = await prisma.address_Applications.findMany({
          where: {
            addressApplications_userID: user.users_ID,
          },
        })

        const addressApplicationsResult = addressApplications.map((a) => {
          return {
            ...a,
            addressApplications_dateAdded:
              a.addressApplications_dateAdded.toISOString(),
            addressApplications_dateReviewed:
              a.addressApplications_dateReviewed?.toISOString(),
          }
        })

        const dumpstersApplicationsSearch =
          await prisma.dumpsters_Applications.findMany({
            where: {
              dumpstersApplications_userID: user.users_ID,
            },
          })

        const dumpsterData = await prisma.dumpster.findMany({
          where: {
            dumpster_ID: { in: dumpstersIDs },
          },
        })

        const cardsData = await prisma.users_Cards.findMany({
          where: {
            usersCards_ID: {
              in: dumpstersApplicationsSearch.map(
                (d) => d.dumpstersApplications_cardID
              ),
            },
          },
        })

        const dumpstersApplications = dumpstersApplicationsSearch
          .map((d) => {
            return {
              ...d,
              user /*  usersToShow.filter(
                (u) => u.users_ID === d.dumpstersApplications_userID
              )[0], */,
              dumpstersApplications_cardNumber: cardsData.find(
                (c) => c.usersCards_ID === d.dumpstersApplications_cardID
              )!.usersCards_number,
              dumpstersApplications_dumpsterName: dumpsterData.find(
                (c) => c.dumpster_ID === d.dumpstersApplications_dumpsterID
              ),
            }
          })
          .filter((c) => c.user !== undefined)

        const dumpstersApplicationsResult = dumpstersApplications.map((d) => {
          return {
            ...d,
            dumpstersApplications_dateAdded:
              d.dumpstersApplications_dateAdded.toISOString(),
            dumpstersApplications_dateReviewed:
              d.dumpstersApplications_dateReviewed?.toISOString(),
            dumpstersApplications_userName: d.user.users_name,
            dumpstersApplications_cardID: d.dumpstersApplications_cardID,
            dumpstersApplications_cardNumber:
              d.dumpstersApplications_cardNumber,
            dumpstersApplications_dumpsterName:
              d.dumpstersApplications_dumpsterName?.dumpster_name,
          }
        })

        const personalDataApplications =
          await prisma.personalData_Applications.findMany({
            where: {
              personalDataApplications_userID: user.users_ID,
            },
          })

        const personalDataApplicationsResult = personalDataApplications.map(
          (p) => {
            return {
              ...p,
              personalDataApplications_dateAdded:
                p.personalDataApplications_dateAdded.toISOString(),
              personalDataApplications_dateReviewed:
                p.personalDataApplications_dateReviewed?.toISOString(),
            }
          }
        )

        const allApplications = {
          cards: cardResult,
          address: addressApplicationsResult,
          dumpsters: dumpstersApplicationsResult,
          personalData: personalDataApplicationsResult,
        }

        return allApplications
      },
    })
  },
})
