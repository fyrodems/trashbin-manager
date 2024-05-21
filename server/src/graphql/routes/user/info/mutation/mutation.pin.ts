import { hash } from 'bcrypt'
import { extendType, inputObjectType, nonNull } from 'nexus'
import { loggedIn } from '@/utils/routeAuth'

export const UserInfoPINMutationProps = inputObjectType({
  name: 'UserInfoPINMutationProps',
  definition(t) {
    t.nonNull.string('new')
  },
})

export const UserInfoPINMutation = extendType({
  type: 'UserInfoMutation',
  definition(t) {
    t.nonNull.field('pin', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('UserInfoPINMutationProps'),
      },
      authorize: loggedIn(),
      async resolve(_parent, { props }, { user, prisma }) {
        if (!user) {
          throw new Error('Not authorized')
        }

        try {
          const hashedPIN = await hash(props.new, 10)
          await prisma.users.update({
            where: {
              users_ID: user.users_ID,
            },
            data: {
              users_PINnumber: hashedPIN,
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
