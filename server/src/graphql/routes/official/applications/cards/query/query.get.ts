import { extendType, inputObjectType, nullable } from 'nexus'
import { loggedIn } from '@/utils/routeAuth'

export const OfficialApplicationsCardsQueryProps = inputObjectType({
  name: 'OfficialApplicationsCardsQueryProps',
  definition(t) {
    t.string('users_data')
  },
})

export const OfficialApplicationCardsGetQuery = extendType({
  type: 'OfficialApplicationsCardsQuery',
  definition(t) {
    t.list.nonNull.field('get', {
      type: 'NewCardType',
      authorize: loggedIn(),
      args: {
        props: nullable('OfficialApplicationsCardsQueryProps'),
      },
      async resolve(_parent, { props }, { user, prisma }) {
        if (!user) {
          throw new TypeError('Unauthorized')
        }

        if (user.users_typeID === 5 || user.users_typeID === 6) {
          // nowe karty do zaakceptowania
          const cards = await prisma.cards_Applications.findMany({
            where: {
              AND: [{ cardsApplications_statusID: 9 }],
            },
          })

          const cardsUsersID = cards.map((c) => c.cardsApplications_userID)

          // uzytkownicy tych kart
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
                {
                  users_ID: {
                    in: cardsUsersID,
                  },
                },
                { OR: [{ users_statusID: 1 }, { users_statusID: 3 }] },
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
                if (
                  a.usersAddress_userID === u.users_ID &&
                  a.usersAddress_statusID === 24
                ) {
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

          //   dodaj karty wymagające zaakceptowania do uzytkowników podlegających pod gminę
          const cardApplications = cards
            .map((c) => {
              return {
                ...c,
                user: usersToShow.find(
                  (u) => u.users_ID === c.cardsApplications_userID
                ),
              }
            })
            .filter((c) => c.user !== undefined)

          // przypisane do tych kart śmietniki
          const applicationsWithDumpsters = cardApplications.map(
            (application) => {
              return {
                applicationID: application.cardsApplications_ID,
                applicationDumpsters:
                  application.cardsApplications_dumpstersIDs.split(';'),
              }
            }
          )

          const dumpstersArrays = applicationsWithDumpsters.map(
            (a) => a.applicationDumpsters
          )

          const dumpstersIDs: number[] = []
          for (const array of dumpstersArrays)
            for (const id of array) dumpstersIDs.push(Number(id))

          const connectedDumpsters = await prisma.dumpster.findMany({
            where: {
              dumpster_ID: { in: dumpstersIDs },
            },
          })

          const cardApplicationsWDumpsters = cardApplications.map((c) => {
            return {
              ...c,
              dumpstersIDs: applicationsWithDumpsters
                .filter((d) => d.applicationID === c.cardsApplications_ID)
                .map((d) => d.applicationDumpsters)[0]
                .map(Number),
            }
          })

          const result = cardApplicationsWDumpsters.map((card) => ({
            cardsApplications_ID: card.cardsApplications_ID,
            cardsApplications_dateAdded:
              card.cardsApplications_dateAdded.toISOString(),
            cardsApplications_dateReviewed:
              card.cardsApplications_dateReviewed?.toISOString(),
            cardsApplications_typeID: card.cardsApplications_typeID,
            cardsApplications_reviewedBy: card.cardsApplications_reviewedBy,
            cardsApplications_userID: card.cardsApplications_userID,
            cardsApplications_statusID: card.cardsApplications_statusID,
            user: card.user,
            dumpsters: connectedDumpsters.filter((d) =>
              card.dumpstersIDs.includes(d.dumpster_ID)
            ),
          }))

          return result as Array<{
            cardsApplications_ID: number
            cardsApplications_dateAdded: string
            cardsApplications_dateReviewed?: string
            cardsApplications_typeID: number
            cardsApplications_reviewedBy?: number
            cardsApplications_userID: number
            cardsApplications_statusID: number
            user: {
              users_ID: number
              users_login: string
              users_name: string
              users_identificationNumber: string
              users_phoneNumber?: string
              users_statusID: number
              users_typeID: number
              users_password: string
              addresses: Array<{
                usersAddress_ID: number
                usersAddress_userID: number
                usersAddress_street: string
                usersAddress_houseNumber: string
                usersAddress_apartamentNumber: string
                usersAddress_postCode: string
                usersAddress_city: string
                usersAddress_typeID: number
                usersAddress_communityID: number
                usersAddress_statusID: number
              }>
            }
            dumpsters: Array<{
              dumpster_ID: number
              dumpster_name: string
              dumpster_description: string | null
              dumpster_street: string
              dumpster_city: string
              dumpster_postCode: string
              dumpster_communityID: number
              dumpster_houseNumbers: string
              dumpster_hasError: boolean
            }>
          }>
        }

        throw new TypeError('Unauthorized')
      },
    })
  },
})
