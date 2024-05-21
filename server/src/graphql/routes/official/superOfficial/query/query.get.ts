import { extendType } from 'nexus'
import { loggedIn } from '@/utils/routeAuth'

export const SuperOfficialOfficialsGetQuery = extendType({
  type: 'SuperOfficialOfficialsQuery',
  definition(t) {
    t.list.nullable.field('get', {
      type: 'UserInfoType',
      authorize: loggedIn(),
      async resolve(_parent, _, { user, prisma }) {
        if (!user || user.users_typeID !== 6) {
          throw new TypeError('Unauthorized')
        }

        const superOfficialAddress = await prisma.users_Address.findFirst({
          where: {
            AND: [
              { usersAddress_userID: user.users_ID },
              { usersAddress_typeID: 3 },
            ],
          },
        })

        const usersInCommunity = await prisma.users_Address.findMany({
          where: {
            usersAddress_communityID:
              superOfficialAddress?.usersAddress_communityID,
          },
        })

        const officialsInCommunity = await prisma.users.findMany({
          where: {
            AND: [
              {
                users_ID: {
                  in: usersInCommunity.map((u) => u.usersAddress_userID),
                },
              },
              // eslint-disable-next-line no-constant-binary-expression
              { users_typeID: 5 || 6 },
            ],
          },
        })

        const addresses = await prisma.users_Address.findMany({
          where: {
            usersAddress_userID: {
              in: officialsInCommunity.map((o) => o.users_ID),
            },
          },
        })

        const result = officialsInCommunity.map((o) => {
          return {
            ...o,
            addresses: addresses
              .map((a) => {
                return a.usersAddress_userID === o.users_ID ? a : undefined
              })
              .filter((a) => a !== undefined),
          }
        })

        return result as Array<{
          users_ID: number
          users_login: string
          users_name: string
          users_password: string
          users_identificationNumber: string
          users_phoneNumber?: string
          users_typeID: number
          users_statusID: number
          addresses: Array<{
            usersAddress_ID: number
            usersAddress_userID: number
            usersAddress_street: string
            usersAddress_houseNumber: string
            usersAddress_apartamentNumber?: string
            usersAddress_postCode: string
            usersAddress_city: string
            usersAddress_typeID: number
            usersAddress_communityID: number
            usersAddress_statusID: number
          }>
        }>
      },
    })
  },
})
