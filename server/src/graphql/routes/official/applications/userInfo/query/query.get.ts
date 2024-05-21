import { extendType, inputObjectType, nullable } from 'nexus'
import { loggedIn } from '@/utils/routeAuth'

export const OfficialApplicationsUserInfoQueryProps = inputObjectType({
  name: 'OfficialApplicationsUserInfoQueryProps',
  definition(t) {
    t.string('users_data')
  },
})

export const OfficialApplicationUserInfoGetQuery = extendType({
  type: 'OfficialApplicationsUserInfoQuery',
  definition(t) {
    t.list.nonNull.field('get', {
      type: 'PersonalDataApplicationsType',
      authorize: loggedIn(),
      args: {
        props: nullable('OfficialApplicationsUserInfoQueryProps'),
      },
      async resolve(_parent, { props }, { user, prisma }) {
        if (!user) {
          throw new TypeError('Unauthorized')
        }

        if (user.users_typeID === 5 || user.users_typeID === 6) {
          // nowe zmiany do zaakceptowania
          const userInfoApplications =
            await prisma.personalData_Applications.findMany({
              where: {
                personalDataApplications_statusID: 9,
              },
            })

          const personalDataUsersID = userInfoApplications.map(
            (u) => u.personalDataApplications_userID
          )

          // uzytkownicy zgłaszający zmiany
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
                    in: personalDataUsersID,
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
                return a.usersAddress_userID === u.users_ID ? a : undefined
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

          //   dodaj zmiany wymagające zaakceptowania do uzytkowników podlegających pod gminę
          const filteredUserInfoApplications = userInfoApplications
            .map((a) => {
              return {
                ...a,
                user: usersToShow.find(
                  (u) => u.users_ID === a.personalDataApplications_userID
                ),
              }
            })
            .filter((a) => a.user !== undefined)

          const result = filteredUserInfoApplications.map((data) => ({
            personalDataApplications_ID: data.personalDataApplications_ID,
            personalDataApplications_dateAdded:
              data.personalDataApplications_dateAdded.toISOString(),
            personalDataApplications_dateReviewed:
              data.personalDataApplications_dateReviewed?.toISOString(),
            personalDataApplications_typeID:
              data.personalDataApplications_typeID,
            personalDataApplications_reviewedBy:
              data.personalDataApplications_reviewedBy,
            personalDataApplications_userID:
              data.personalDataApplications_userID,
            personalDataApplications_statusID:
              data.personalDataApplications_statusID,
            personalDataApplications_name: data.personalDataApplications_name,
            personalDataApplications_oldName: data.user?.users_name,
          }))

          return result as Array<{
            personalDataApplications_ID: number
            personalDataApplications_dateAdded: string
            personalDataApplications_dateReviewed?: string
            personalDataApplications_typeID: number
            personalDataApplications_reviewedBy?: number
            personalDataApplications_userID: number
            personalDataApplications_statusID: number
            personalDataApplications_name: string
            personalDataApplications_oldName: string
          }>
        }

        throw new TypeError('Unauthorized')
      },
    })
  },
})
