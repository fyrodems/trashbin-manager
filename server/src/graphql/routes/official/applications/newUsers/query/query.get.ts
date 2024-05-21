import { extendType, inputObjectType, nullable } from 'nexus'
import { loggedIn } from '@/utils/routeAuth'

export const OfficialApplicationsNewUsersQueryProps = inputObjectType({
  name: 'OfficialApplicationsNewUsersQueryProps',
  definition(t) {
    t.string('users_data')
  },
})

export const NewUsersGetQuery = extendType({
  type: 'OfficialApplicationsNewUsersQuery',
  definition(t) {
    t.list.nonNull.field('get', {
      type: 'UserInfoType',
      authorize: loggedIn(),
      args: {
        props: nullable('OfficialApplicationsNewUsersQueryProps'),
      },
      async resolve(_parent, { props }, { user, prisma }) {
        if (!user) {
          throw new TypeError('Unauthorized')
        }

        if (user.users_typeID === 5 || user.users_typeID === 6) {
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

                { users_statusID: 3 },
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
                communities: user.communities
                  .filter((community) => community !== undefined)
                  .filter((c) =>
                    c
                      ? officialCommunities.has(c.usersAddress_communityID)
                      : null
                  ),
              }
            })
            .filter((array) => array.communities.length > 0)

          const result = usersToShow.map((user) => ({
            users_ID: user.users_ID,
            users_login: user.users_login,
            users_name: user.users_name,
            users_identificationNumber: user.users_identificationNumber,
            users_phoneNumber: user.users_phoneNumber,
            users_statusID: user.users_statusID,
            users_typeID: user.users_typeID,
            users_password: user.users_password,
            addresses: user.communities,
          }))

          return result as Array<{
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
          }>
        }

        throw new TypeError('Unauthorized')
      },
    })
  },
})
