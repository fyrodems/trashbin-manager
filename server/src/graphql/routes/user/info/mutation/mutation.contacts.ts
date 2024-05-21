import { extendType, inputObjectType, nonNull } from 'nexus'
import { loggedIn } from '@/utils/routeAuth'

export const UserInfoContactsMutationProps = inputObjectType({
  name: 'UserInfoContactsMutationProps',
  definition(t) {
    t.nonNull.string('users_login')
    t.nullable.string('users_phoneNumber')
  },
})

export const UserInfoContactsMutation = extendType({
  type: 'UserInfoMutation',
  definition(t) {
    t.nonNull.field('contacts', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('UserInfoContactsMutationProps'),
      },
      authorize: loggedIn(),
      async resolve(_parent, { props }, { user, prisma }) {
        if (!user) {
          throw new TypeError('Unauthorized')
        }

        try {
          await prisma.users.update({
            where: {
              users_ID: user.users_ID,
            },
            data: {
              users_login: props.users_login,
              users_phoneNumber: props.users_phoneNumber,
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
            },
          }
        }
      },
    })
  },
})
