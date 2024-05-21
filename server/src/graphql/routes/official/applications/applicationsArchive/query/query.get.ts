import { extendType } from 'nexus'
import { loggedIn } from '@/utils/routeAuth'

export const OfficialApplicationArchiveGetQuery = extendType({
  type: 'OfficialApplicationsArchiveQuery',
  definition(t) {
    t.nonNull.field('get', {
      type: 'ApplicationArchiveType',
      authorize: loggedIn(),
      async resolve(_parent, _, { user, prisma }) {
        if (!user) {
          throw new TypeError('Unauthorized')
        }

        if (user.users_typeID === 5 || user.users_typeID === 6) {
          // gmina urzędnika
          const officialCommunity = await prisma.users_Address.findFirst({
            where: {
              usersAddress_userID: user.users_ID,
            },
          })

          if (!officialCommunity) {
            throw new TypeError('Nie znaleziono gminy')
          }

          const officialCommunityID = officialCommunity.usersAddress_communityID

          // spis id wszytkich urzednikow z danej gminy
          const communityOfficialsAddresses =
            await prisma.users_Address.findMany({
              where: {
                usersAddress_communityID: officialCommunityID,
              },
            })

          const communityOfficials = communityOfficialsAddresses.map(
            (o) => o.usersAddress_ID
          )

          // wyszukujemy wszystkie wnioski przejrzane przez tych urzednikow

          const addressApplications =
            await prisma.address_Applications.findMany({
              where: {
                addressApplications_reviewedBy: { in: communityOfficials },
              },
            })

          const addressApplicationsUsers = await prisma.users.findMany({
            where: {
              users_ID: {
                in: addressApplications.map(
                  (a) => a.addressApplications_userID
                ),
              },
            },
          })

          const addressApplicationsResult = addressApplications.map((a) => {
            return {
              ...a,
              addressApplications_dateAdded:
                a.addressApplications_dateAdded.toISOString(),
              addressApplications_dateReviewed:
                a.addressApplications_dateReviewed?.toISOString(),
              addressApplications_userName: addressApplicationsUsers.find(
                (u) => u.users_ID === a.addressApplications_userID
              )!.users_name,
              addressApplications_userLogin: addressApplicationsUsers.find(
                (u) => u.users_ID === a.addressApplications_userID
              )!.users_login,
              addressApplications_userIdentificationNumber:
                addressApplicationsUsers.find(
                  (u) => u.users_ID === a.addressApplications_userID
                )!.users_identificationNumber,
            }
          })

          const cardsApplications = await prisma.cards_Applications.findMany({
            where: {
              cardsApplications_reviewedBy: { in: communityOfficials },
            },
          })

          const cardsApplicationsUsers = await prisma.users.findMany({
            where: {
              users_ID: {
                in: cardsApplications.map((a) => a.cardsApplications_userID),
              },
            },
          })

          const cardsApplicationsResult = cardsApplications.map((c) => {
            return {
              ...c,
              cardsApplications_dateAdded:
                c.cardsApplications_dateAdded.toISOString(),
              cardsApplications_dateReviewed:
                c.cardsApplications_dateReviewed?.toISOString(),
              cardsApplications_userName: cardsApplicationsUsers.find(
                (u) => u.users_ID === c.cardsApplications_userID
              )!.users_name,
              cardsApplications_userLogin: cardsApplicationsUsers.find(
                (u) => u.users_ID === c.cardsApplications_userID
              )!.users_login,
              cardsApplications_userIdentificationNumber:
                cardsApplicationsUsers.find(
                  (u) => u.users_ID === c.cardsApplications_userID
                )!.users_identificationNumber,
            }
          })

          const dumpstersApplications =
            await prisma.dumpsters_Applications.findMany({
              where: {
                dumpstersApplications_reviewedBy: { in: communityOfficials },
              },
            })

          const dumpstersApplicationsUsers = await prisma.users.findMany({
            where: {
              users_ID: {
                in: dumpstersApplications.map(
                  (a) => a.dumpstersApplications_userID
                ),
              },
            },
          })

          const dumpstersApplicationsCards = await prisma.users_Cards.findMany({
            where: {
              usersCards_ID: {
                in: dumpstersApplications.map(
                  (d) => d.dumpstersApplications_cardID
                ),
              },
            },
          })

          const dumpstersApplicationsDumpsters = await prisma.dumpster.findMany(
            {
              where: {
                dumpster_ID: {
                  in: dumpstersApplications.map(
                    (d) => d.dumpstersApplications_dumpsterID
                  ),
                },
              },
            }
          )

          const dumpstersApplicationsResult = dumpstersApplications.map((d) => {
            return {
              ...d,
              dumpstersApplications_dateAdded:
                d.dumpstersApplications_dateAdded.toISOString(),
              dumpstersApplications_dateReviewed:
                d.dumpstersApplications_dateReviewed?.toISOString(),
              dumpstersApplications_userName: dumpstersApplicationsUsers.find(
                (u) => u.users_ID === d.dumpstersApplications_userID
              )!.users_name,
              dumpstersApplications_userLogin: dumpstersApplicationsUsers.find(
                (u) => u.users_ID === d.dumpstersApplications_userID
              )!.users_login,
              dumpstersApplications_userIdentificationNumber:
                dumpstersApplicationsUsers.find(
                  (u) => u.users_ID === d.dumpstersApplications_userID
                )!.users_identificationNumber,
              dumpstersApplications_cardNumber: dumpstersApplicationsCards.find(
                (c) => c.usersCards_ID === d.dumpstersApplications_cardID
              )!.usersCards_number,
              dumpstersApplications_dumpsterNumber:
                dumpstersApplicationsDumpsters.find(
                  (c) => c.dumpster_ID === d.dumpstersApplications_dumpsterID
                )!.dumpster_name,
            }
          })

          const personalDataApplications =
            await prisma.personalData_Applications.findMany({
              where: {
                personalDataApplications_reviewedBy: { in: communityOfficials },
              },
            })

          const personalDataApplicationsUsers = await prisma.users.findMany({
            where: {
              users_ID: {
                in: personalDataApplications.map(
                  (a) => a.personalDataApplications_userID
                ),
              },
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
                personalDataApplications_userName:
                  personalDataApplicationsUsers.find(
                    (u) => u.users_ID === p.personalDataApplications_userID
                  )!.users_name,
                personalDataApplications_userLogin:
                  personalDataApplicationsUsers.find(
                    (u) => u.users_ID === p.personalDataApplications_userID
                  )!.users_login,
                personalDataApplications_userIdentificationNumber:
                  personalDataApplicationsUsers.find(
                    (u) => u.users_ID === p.personalDataApplications_userID
                  )!.users_identificationNumber,
              }
            }
          )

          const result = {
            addressApplications: addressApplicationsResult,
            cardsApplications: cardsApplicationsResult,
            dumpstersApplications: dumpstersApplicationsResult,
            personalDataApplications: personalDataApplicationsResult,
          }

          return result
        }

        throw new TypeError('Unauthorized')
      },
    })
  },
})
