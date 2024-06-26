import { extendType, inputObjectType, nonNull } from 'nexus'
import { hash } from 'bcrypt'

export const OfficialCreateUserAddMutationProps = inputObjectType({
  name: 'OfficialCreateUserAddMutationProps',
  definition(t) {
    t.nonNull.string('users_name')
    t.nonNull.string('users_identificationNumber')
    t.nonNull.string('users_login')
    t.nonNull.string('users_password')
    t.nullable.string('users_phoneNumber')
    t.nonNull.string('usersAddress_street')
    t.nonNull.string('usersAddress_houseNumber')
    t.nullable.string('usersAddress_apartamentNumber')
    t.nonNull.string('usersAddress_postCode')
    t.nonNull.string('usersAddress_city')
    t.nonNull.int('usersAddress_communityID')
  },
})

export const OfficialCreateUserAddMutation = extendType({
  type: 'OfficialCreateUserMutation',
  definition(t) {
    t.nonNull.field('add', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('OfficialCreateUserAddMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const {
          users_name,
          users_identificationNumber,
          users_login,
          users_password,
          users_phoneNumber,
          usersAddress_street,
          usersAddress_houseNumber,
          usersAddress_apartamentNumber,
          usersAddress_postCode,
          usersAddress_city,
          usersAddress_communityID,
        } = props
        const hashedPassword = await hash(users_password, 10)

        const existingUser = await prisma.users.findFirst({
          where: {
            users_login,
          },
        })

        if (existingUser) {
          return {
            status: {
              message: 'Error',
              description: 'User already exists',
            },
          }
        }

        try {
          const lastUserID = await prisma.users.findMany({
            orderBy: {
              users_ID: 'desc',
            },
            take: 1,
          })

          await prisma.users.create({
            data: {
              users_ID: lastUserID[0]?.users_ID
                ? lastUserID[0].users_ID + 1
                : 1,
              users_login,
              users_name,
              users_identificationNumber,
              users_phoneNumber,
              users_password: hashedPassword,
              users_typeID: 4,
              users_statusID: 1,
            },
          })

          const lastAddressID = await prisma.users_Address.findMany({
            orderBy: {
              usersAddress_ID: 'desc',
            },
            take: 1,
          })

          await prisma.users_Address.create({
            data: {
              usersAddress_ID: lastAddressID[0]?.usersAddress_ID
                ? lastAddressID[0].usersAddress_ID + 1
                : 1,
              usersAddress_userID: lastUserID[0].users_ID + 1,
              usersAddress_street,
              usersAddress_houseNumber,
              usersAddress_apartamentNumber,
              usersAddress_postCode,
              usersAddress_city,
              usersAddress_typeID: 3,
              usersAddress_communityID,
              usersAddress_statusID: 24,
            },
          })
          /* 
          const accessToken = createAccessToken(user)
          const refreshToken = await createRefreshToken(user)

          if (!refreshToken) {
            return {
              status: {
                message: 'Error',
                description: 'Refresh token creation failed',
              },
            }
          } */

          /*      setCookies(res, accessToken, refreshToken) */

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
