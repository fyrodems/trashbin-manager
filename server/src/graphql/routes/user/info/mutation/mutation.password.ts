import { compare, hash } from 'bcrypt'
import { extendType, inputObjectType, nonNull } from 'nexus'
import { loggedIn } from '@/utils/routeAuth'

export const UserInfoPasswordMutationProps = inputObjectType({
  name: 'UserInfoPasswordMutationProps',
  definition(t) {
    t.nonNull.string('old')
    t.nonNull.string('new')
  },
})

export const UserInfoPasswordMutation = extendType({
  type: 'UserInfoMutation',
  definition(t) {
    t.nonNull.field('password', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('UserInfoPasswordMutationProps'),
      },
      authorize: loggedIn(),
      async resolve(_parent, { props }, { user, prisma }) {
        if (!user) {
          throw new Error('Not authorized')
        }

        const isOldPasswordCorrect = await compare(
          props.old,
          user.users_password
        )

        if (!isOldPasswordCorrect) {
          return {
            status: {
              message: 'Error',
            },
          }
        }

        try {
          const hashedPassword = await hash(props.new, 10)
          await prisma.users.update({
            where: {
              users_ID: user.users_ID,
            },
            data: {
              users_password: hashedPassword,
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
