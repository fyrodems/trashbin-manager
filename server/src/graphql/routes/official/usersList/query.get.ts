import { extendType, inputObjectType, objectType, nullable } from 'nexus'

export const OfficialUserInfoGetQueryResult = objectType({
  name: 'OfficialUserInfoGetQueryResult',
  definition() {},
})

export const OfficialUserInfoGetQueryExtension = extendType({
  type: 'OfficialUserInfoQuery',
  definition(t) {
    t.field('get', {
      type: 'OfficialUserInfoGetQueryResult',
      args: {
        props: nullable('OfficialUserInfoGetQueryProps'),
      },
      resolve() {
        return true
      },
    })
  },
})

export const OfficialUserInfoGetQueryProps = inputObjectType({
  name: 'OfficialUserInfoGetQueryProps',
  definition(t) {
    t.string('users_name')
  },
})

export const OfficialUserInfoGetQueryResultUsage = extendType({
  type: 'OfficialUserInfoGetQueryResult',
  definition(t) {
    t.list.nonNull.field('result', {
      type: 'OfficialUserSearchType',
      args: {
        props: nullable('OfficialUserInfoGetQueryProps'),
      },
      async resolve(_parent, { props }, { user, prisma }) {
        if (!user) {
          throw new TypeError('Unauthorized')
        }

        if (
          user.users_typeID === 5 ||
          user.users_typeID === 6 ||
          user.users_typeID === 10
        ) {
          const users = await prisma.users.findMany({
            where: {
              AND: [
                {
                  OR: [
                    {
                      users_login: { contains: props?.users_name ?? undefined },
                    },
                    {
                      users_name: {
                        contains: props?.users_name ?? undefined,
                      },
                    },
                    {
                      users_identificationNumber: {
                        contains: props?.users_name ?? undefined,
                      },
                    },
                    {
                      users_phoneNumber: {
                        contains: props?.users_name ?? undefined,
                      },
                    },
                  ],
                },

                { users_typeID: 4 },
              ],
            },
          })

          // uzytkownicy wraz z gminami

          const usersIDs = users.map((u) => u.users_ID)
          // bierzemy pod uwagę użytkowników z aktualnymi bądź oczekującymi adresami w gminie urzędnika
          const addresses = await prisma.users_Address.findMany({
            where: {
              AND: [
                { usersAddress_userID: { in: usersIDs } },
                { usersAddress_statusID: { in: [24, 25] } },
              ],
            },
          })

          const usersWCommunities = users.map((u) => {
            return {
              ...u,
              communities: addresses.map((a) => {
                return a.usersAddress_userID === u.users_ID
                  ? a.usersAddress_communityID
                  : null
              }),
            }
          })

          // GMINY URZĘDNIKA
          const officialAddresses = await prisma.users_Address.findMany({
            where: {
              AND: [
                { usersAddress_statusID: 24 },
                { usersAddress_userID: user.users_ID },
              ],
            },
          })

          const officialCommunities = new Set(
            officialAddresses.map((address) => address.usersAddress_communityID)
          )

          // JEŚLI ŻADEN Z ADRESÓW UŻYTKOWNIKA NIE JEST TOŻSAMY Z GMINĄ URZĘDNIKA, NIE POKAZUJ GO W WYNIKACH WYSZUKIWANIA
          const usersToShow = usersWCommunities
            // eslint-disable-next-line array-callback-return
            .map((user) => {
              for (const c of user.communities) {
                if (c !== undefined && c !== null) {
                  if (officialCommunities.has(c)) {
                    return user
                  }

                  return undefined
                }
              }
            })
            .filter((u) => u !== undefined)

          const result = usersToShow.map((user) => ({
            users_ID: user?.users_ID,
            users_name: user?.users_name,
            users_identificationNumber: user?.users_identificationNumber,
            users_login: user?.users_login,
            users_statusID: user?.users_statusID,
            users_phoneNumber: user?.users_phoneNumber,
          }))

          return result as Array<{
            users_ID: number
            users_login: string
            users_name: string
            users_identificationNumber: string
            users_phoneNumber?: string
            users_statusID: number
          }>
        }

        throw new TypeError('Unauthorized')
      },
    })
  },
})
