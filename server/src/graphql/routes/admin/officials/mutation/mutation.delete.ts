import { extendType, inputObjectType, nonNull } from 'nexus'

export const AdminOfficialsDeleteMutationProps = inputObjectType({
  name: 'AdminOfficialsDeleteMutationProps',
  definition(t) {
    t.nonNull.int('user_ID')
  },
})

export const AdminOfficialsDeleteMutation = extendType({
  type: 'AdminOfficialsMutation',
  definition(t) {
    t.field('delete', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('AdminOfficialsDeleteMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const { user_ID } = props
        try {
          const userAddresses = await prisma.users_Address.findMany({
            where: {
              usersAddress_userID: user_ID,
            },
          })
          // do celow statystycznych nie usuwamy uzytkownika i jego adresow, a jedynie go blokujemy
          const userAddressesIDs = userAddresses.map((a) => a.usersAddress_ID)

          await prisma.users_Address.updateMany({
            where: { usersAddress_ID: { in: userAddressesIDs } },
            data: {
              usersAddress_statusID: 26,
            },
          })

          await prisma.users.update({
            where: {
              users_ID: user_ID,
            },
            data: {
              users_statusID: 2,
            },
          })
          return {
            status: {
              message: 'Success',
            },
          }
        } catch {
          return {
            status: {
              message: 'Error',
              description: 'Error while deleting official',
            },
          }
        }
      },
    })
  },
})

// czy to nie powinno usuwać także wszystkich urzędników, których un stworzył?
