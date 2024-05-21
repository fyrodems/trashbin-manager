import { extendType } from 'nexus'

export const AdminOfficialsGetQueryResult = extendType({
  type: 'AdminOfficialsQuery',
  definition(t) {
    t.list.nonNull.field('get', {
      type: 'AdminUserInfoType',
      async resolve(_parent, _, { user, prisma }) {
        if (!user || user.users_typeID !== 7) {
          throw new TypeError('Unauthorized')
        }
        // wyszukujemy wszystkich super urzednikow oraz firmy

        const superOfficials = await prisma.users.findMany({
          where: {
            AND: [
              {
                OR: [
                  { users_typeID: 6 },
                  { users_typeID: 9 },
                  { users_typeID: 10 },
                ],
              },
              { users_statusID: 1 },
            ],
          },
        })

        // uzytkownicy wraz z gminami

        const superOfficalsIDs = superOfficials.map((u) => u.users_ID)
        const addresses = await prisma.users_Address.findMany({
          where: {
            usersAddress_userID: { in: superOfficalsIDs },
          },
        })

        const usersWCommunities = superOfficials.map((u) => {
          const addressesList = []

          for (const address of addresses) {
            if (address.usersAddress_userID === u.users_ID) {
              addressesList.push(address)
            }
          }

          return {
            ...u,
            addresses: addressesList,
          }
        })

        const result = usersWCommunities.map((user) => ({
          users_ID: user.users_ID,
          users_name: user.users_name,
          users_identificationNumber: user.users_identificationNumber,
          users_login: user.users_login,
          users_statusID: user.users_statusID,
          users_phoneNumber: user.users_phoneNumber,
          users_typeID: user.users_typeID,
          addresses: user.addresses,
        }))

        return result
      },
    })
  },
})
