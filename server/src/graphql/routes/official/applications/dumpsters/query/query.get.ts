import { extendType, inputObjectType, nullable } from 'nexus'
import { loggedIn } from '@/utils/routeAuth'

export const OfficialApplicationsDumpstersQueryProps = inputObjectType({
  name: 'OfficialApplicationsDumpstersQueryProps',
  definition(t) {
    t.string('users_data')
  },
})

export const OfficialApplicationDumpstersGetQuery = extendType({
  type: 'OfficialApplicationsDumpstersQuery',
  definition(t) {
    t.list.nonNull.field('get', {
      type: 'NewDumpsterApplicationType',
      authorize: loggedIn(),
      args: {
        props: nullable('OfficialApplicationsDumpstersQueryProps'),
      },
      async resolve(_parent, { props }, { user, prisma }) {
        if (!user) {
          throw new TypeError('Unauthorized')
        }

        if (user.users_typeID === 5 || user.users_typeID === 6) {
          // wnioski o dodanie altany śmietnikowej do zaakceptowania
          const dumpsters = await prisma.dumpsters_Applications.findMany({
            where: {
              dumpstersApplications_statusID: 9,
            },
          })

          const dumpstersUsersID = dumpsters.map(
            (d) => d.dumpstersApplications_userID
          )

          const dumpstersIDs = dumpsters.map(
            (d) => d.dumpstersApplications_dumpsterID
          )

          // uzytkownicy wysyłający wniosek
          const users = await prisma.users.findMany({
            where: {
              AND: [
                {
                  OR: [
                    {
                      users_login: { contains: props?.users_data ?? undefined },
                    },
                    {
                      users_name: {
                        contains: props?.users_data ?? undefined,
                      },
                    },
                    {
                      users_identificationNumber: {
                        contains: props?.users_data ?? undefined,
                      },
                    },
                  ],
                },
                { OR: [{ users_statusID: 1 }, { users_statusID: 3 }] },
                {
                  users_ID: {
                    in: dumpstersUsersID,
                  },
                },
              ],
            },
          })

          // uzytkownicy wraz z gminami
          const usersIDs = users.map((u) => u.users_ID)
          const addresses = await prisma.users_Address.findMany({
            where: {
              usersAddress_userID: { in: usersIDs },
            },
          })

          const usersWCommunities = users.map((u) => {
            return {
              ...u,
              communities: addresses.map((a) => {
                if (a.usersAddress_userID === u.users_ID) {
                  return a
                }

                return undefined
              }),
            }
          })

          // GMINY URZĘDNIKA
          const officialAddresses = await prisma.users_Address.findMany({
            where: {
              usersAddress_userID: user.users_ID,
            },
          })

          const officialCommunities = new Set(
            officialAddresses.map((address) => address.usersAddress_communityID)
          )

          // JEŚLI ŻADEN Z ADRESÓW UŻYTKOWNIKA NIE JEST TOŻSAMY Z GMINĄ URZĘDNIKA, NIE POKAZUJ GO W WYNIKACH WYSZUKIWANIA
          const usersToShow = usersWCommunities
            .map((user) => {
              return {
                ...user,
                addresses: user.communities
                  .filter((community) => community !== undefined)
                  .filter((c) =>
                    c
                      ? officialCommunities.has(c.usersAddress_communityID)
                      : null
                  ),
              }
            })
            .filter((array) => array.addresses.length > 0)

          // dodaj numer karty
          const cardsData = await prisma.users_Cards.findMany({
            where: {
              usersCards_ID: {
                in: dumpsters.map((d) => d.dumpstersApplications_cardID),
              },
            },
          })

          // dodaj numer altany
          const dumpsterData = await prisma.dumpster.findMany({
            where: {
              dumpster_ID: { in: dumpstersIDs },
            },
          })

          //   dodaj śmietniki wymagające zaakceptowania do uzytkowników podlegających pod gminę
          const dumpstersApplications = dumpsters
            .map((d) => {
              return {
                ...d,
                user: usersToShow.find(
                  (u) => u.users_ID === d.dumpstersApplications_userID
                ),
                dumpstersApplications_cardNumber: cardsData.find(
                  (c) => c.usersCards_ID === d.dumpstersApplications_cardID
                )?.usersCards_number,
                dumpstersApplications_dumpsterName: dumpsterData.find(
                  (c) => c.dumpster_ID === d.dumpstersApplications_dumpsterID
                ),
              }
            })
            .filter((c) => c.user !== undefined)

          const result = dumpstersApplications.map((dumpster) => ({
            dumpstersApplications_ID: dumpster.dumpstersApplications_ID,
            dumpstersApplications_dateAdded:
              dumpster.dumpstersApplications_dateAdded.toISOString(),
            dumpstersApplications_dateReviewed:
              dumpster.dumpstersApplications_dateReviewed?.toISOString(),
            dumpstersApplications_typeID: dumpster.dumpstersApplications_typeID,
            dumpstersApplications_reviewedBy:
              dumpster.dumpstersApplications_reviewedBy,
            dumpstersApplications_userID: dumpster.dumpstersApplications_userID,
            dumpstersApplications_userName: dumpster.user?.users_name,
            dumpstersApplications_dumpsterID:
              dumpster.dumpstersApplications_dumpsterID,
            dumpstersApplications_statusID:
              dumpster.dumpstersApplications_statusID,
            dumpstersApplications_cardID: dumpster.dumpstersApplications_cardID,
            dumpstersApplications_cardNumber:
              dumpster.dumpstersApplications_cardNumber,
            dumpstersApplications_dumpsterName:
              dumpster.dumpstersApplications_dumpsterName?.dumpster_name,
          }))

          return result as Array<{
            dumpstersApplications_ID: number
            dumpstersApplications_dateAdded: string
            dumpstersApplications_dateReviewed?: string
            dumpstersApplications_typeID: number
            dumpstersApplications_reviewedBy?: number
            dumpstersApplications_userID: number
            dumpstersApplications_userName: string
            dumpstersApplications_dumpsterID: number
            dumpstersApplications_statusID: number
            dumpstersApplications_cardID: number
            dumpstersApplications_cardNumber: string
            dumpstersApplications_dumpsterName: string
          }>
        }

        throw new TypeError('Unauthorized')
      },
    })
  },
})
