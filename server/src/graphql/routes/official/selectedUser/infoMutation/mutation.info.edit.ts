import { extendType, inputObjectType, nonNull } from 'nexus'
import { compare, hash } from 'bcrypt'

export const OfficialUserInfoEditMutationProps = inputObjectType({
  name: 'OfficialUserInfoEditMutationProps',
  definition(t) {
    t.nonNull.int('users_ID')
    t.nonNull.string('users_login')
    t.nullable.string('users_phoneNumber')
    t.string('oldPassword')
    t.string('newPassword')
    t.nonNull.string('users_name')
    t.nonNull.string('users_identificationNumber')
    t.nonNull.int('users_statusID')
  },
})

export const OfficialUserInfoEditMutation = extendType({
  type: 'OfficialUserInfoMutation',
  definition(t) {
    t.field('edit', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('OfficialUserInfoEditMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const {
          users_ID,
          users_login,
          users_phoneNumber,
          oldPassword,
          newPassword,
          users_name,
          users_identificationNumber,
          users_statusID,
        } = props

        //   password
        let hashedPassword = null
        try {
          const user = await prisma.users.findUnique({
            where: {
              users_ID,
            },
          })

          if (user && oldPassword && newPassword) {
            const isOldPasswordCorrect = await compare(
              oldPassword,
              user.users_password
            )
            hashedPassword = await hash(newPassword, 10)
            if (!isOldPasswordCorrect) {
              return {
                status: {
                  message: 'Error',
                },
              }
            }
          }

          let data
          if (hashedPassword) {
            data = {
              users_login,
              users_phoneNumber,
              users_password: hashedPassword,
              users_name,
              users_identificationNumber,
              users_statusID,
            }
          } else {
            data = {
              users_login,
              users_phoneNumber,
              users_name,
              users_identificationNumber,
              users_statusID,
            }
          }

          await prisma.users.update({
            where: {
              users_ID,
            },
            data,
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
