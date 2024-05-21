import { compare } from 'bcrypt'
import { extendType, inputObjectType, nonNull } from 'nexus'
import { createAccessToken } from '@/auth/helpers/accessToken'
import { setCookies } from '@/auth/helpers/cookies'
import { createRefreshToken } from '@/auth/helpers/refreshToken'

export const AuthLoginMutationProps = inputObjectType({
  name: 'AuthLoginMutationProps',
  definition(t) {
    t.nonNull.string('users_login')
    t.nonNull.string('users_password')
  },
})

export const AuthLoginMutation = extendType({
  type: 'AuthMutation',
  definition(t) {
    t.nonNull.field('login', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('AuthLoginMutationProps'),
      },
      async resolve(_parent, { props }, { res, prisma }) {
        const user = await prisma.users.findFirst({
          where: {
            /* !!! do sprawdzenia czy działa */
            users_login: props.users_login,
          },
        })

        if (!user) {
          return {
            status: {
              message: 'Error',
              description: 'User not found',
            },
          }
        }

        if (user.users_statusID === 2) {
          return {
            status: {
              message: 'Blocked',
              description: 'User blocked',
            },
          }
        }

        if (user.users_statusID === 3) {
          return {
            status: {
              message: 'WaitingForApproval',
              description: 'User not approved',
            },
          }
        }

        if (!(await compare(props.users_password, user.users_password))) {
          return {
            status: {
              message: 'Error',
              description: 'Wrong password',
            },
          }
        }

        const accessToken = createAccessToken(user)
        const refreshToken = await createRefreshToken(user)

        if (!refreshToken) {
          return {
            status: {
              message: 'Error',
              description: 'Refresh token creation failed',
            },
          }
        }

        setCookies(res, accessToken, refreshToken)

        return {
          status: {
            message: 'Success',
          },
        }
      },
    })
  },
})
