import { extendType, inputObjectType, nonNull } from 'nexus'
import { hash } from 'bcrypt'
import { loggedIn } from '@/utils/routeAuth'

export const AdminChangeOfficialAndSuperOfficialChangePasswordProps =
  inputObjectType({
    name: 'AdminChangeOfficialAndSuperOfficialChangePasswordProps',
    definition(t) {
      t.nonNull.int('user_ID')
      t.nonNull.string('user_newPassword')
      t.nonNull.string('user_confirmNewPassword')
    },
  })

export const AdminChangeOfficialChangePasswordMutationExtension = extendType({
  type: 'AdminOfficialsMutation',
  definition(t) {
    t.field('changePassword', {
      type: 'MutationResponseType',
      args: {
        props: nonNull(
          'AdminChangeOfficialAndSuperOfficialChangePasswordProps'
        ),
      },
      authorize: loggedIn(),
      async resolve(_parent, { props }, { prisma, user }) {
        if (!user || user.users_typeID !== 7) {
          throw new TypeError('Unauthorized')
        }

        if (props.user_newPassword !== props.user_confirmNewPassword)
          return {
            status: {
              message: 'Error',
              description: 'Passwords are not the same',
            },
          }

        try {
          const hashedPassword = await hash(props.user_newPassword, 10)

          await prisma.users.update({
            where: { users_ID: props.user_ID },
            data: { users_password: hashedPassword },
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
              description: 'Error while changing a password',
            },
          }
        }
      },
    })
  },
})
