import { extendType, inputObjectType, nonNull } from 'nexus'
import { loggedIn } from '@/utils/routeAuth'

export const SuperOfficialOfficialDeleteMutationProps = inputObjectType({
  name: 'SuperOfficialOfficialDeleteMutationProps',
  definition(t) {
    t.nonNull.int('users_ID')
  },
})

export const SuperOfficialDeleteOfficialsMutationExtension = extendType({
  type: 'SuperOfficialOfficialsMutation',
  definition(t) {
    t.field('delete', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('SuperOfficialOfficialDeleteMutationProps'),
      },
      authorize: loggedIn(),
      async resolve(_parent, { props }, { prisma, user }) {
        if (!user || user.users_typeID !== 6) {
          throw new TypeError('Unauthorized')
        }

        const { users_ID } = props

        try {
          await prisma.users_Address.updateMany({
            where: {
              usersAddress_userID: users_ID,
            },
            data: {
              usersAddress_statusID: 26,
            },
          })

          await prisma.users.update({
            where: {
              users_ID,
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
