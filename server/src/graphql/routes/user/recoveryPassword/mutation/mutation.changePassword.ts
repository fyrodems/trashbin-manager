import { hash } from 'bcrypt'
import { extendType, inputObjectType, nonNull } from 'nexus'

export const ChangePasswordMutationProps = inputObjectType({
  name: 'ChangePasswordMutationProps',
  definition(t) {
    t.nonNull.int('user_ID')
    t.nonNull.string('user_newPassword')
  },
})

export const ChangePasswordMutation = extendType({
  type: 'UserRecoveryMutation',
  definition(t) {
    t.nonNull.field('resetPassword', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('ChangePasswordMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        if (!props?.user_ID || !props?.user_newPassword)
          return {
            status: {
              message: 'Error',
              description:
                'User does not exist or password has not been provided',
            },
          }
        const hashedPassword = await hash(props.user_newPassword, 10)

        await prisma.users.update({
          where: {
            users_ID: props?.user_ID,
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
      },
    })
  },
})
