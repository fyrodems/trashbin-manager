import { extendType, inputObjectType, nonNull } from 'nexus'
import { loggedIn } from '@/utils/routeAuth'

export const SuperOfficialOfficialRestoreMutationProps = inputObjectType({
  name: 'SuperOfficialOfficialRestoreMutationProps',
  definition(t) {
    t.nonNull.int('users_ID')
  },
})

export const SuperOfficialRestoreOfficialsMutationExtension = extendType({
  type: 'SuperOfficialOfficialsMutation',
  definition(t) {
    t.field('restore', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('SuperOfficialOfficialRestoreMutationProps'),
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
              usersAddress_statusID: 24,
            },
          })

          await prisma.users.update({
            where: {
              users_ID,
            },
            data: {
              users_statusID: 1,
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
              description: 'Error while restoring official',
            },
          }
        }
      },
    })
  },
})
