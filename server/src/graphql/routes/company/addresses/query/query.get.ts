import { extendType } from 'nexus'

export const CompanyAddressGetQueryResult = extendType({
  type: 'CompanyAddressQuery',
  definition(t) {
    t.list.nonNull.field('get', {
      type: 'UsersAddressType',
      async resolve(_parent, _, { user, prisma }) {
        if (!user) {
          throw new TypeError('Unauthorized')
        }

        if (user.users_typeID === 9 || user.users_typeID === 10) {
          const companyAddress = await prisma.users_Address.findMany({
            where: {
              AND: [
                { usersAddress_userID: user.users_ID },
                { usersAddress_statusID: 24 },
              ],
            },
          })
          return companyAddress
        }

        throw new TypeError('Unauthorized')
      },
    })
  },
})
