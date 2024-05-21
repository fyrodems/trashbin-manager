import { extendType, inputObjectType, nonNull } from 'nexus'
import { hash } from 'bcrypt'
import { loggedIn } from '@/utils/routeAuth'

export const AdminNewOfficialAddMutationProps = inputObjectType({
  name: 'AdminNewOfficialAddMutationProps',
  definition(t) {
    t.nonNull.string('users_login')
    t.nonNull.string('users_password')
    t.nonNull.string('users_name')
    t.nonNull.string('users_identificationNumber')
    t.nonNull.string('users_phoneNumber')
    t.nonNull.string('usersAddress_street')
    t.nonNull.string('usersAddress_houseNumber')
    t.nullable.string('usersAddress_apartamentNumber')
    t.nonNull.string('usersAddress_postCode')
    t.nonNull.string('usersAddress_city')
    t.nonNull.int('usersAddress_communityID')
    t.nullable.int('users_typeID')
  },
})

export const AdminAddOfficialsMutationExtension = extendType({
  type: 'AdminOfficialsMutation',
  definition(t) {
    t.field('add', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('AdminNewOfficialAddMutationProps'),
      },
      authorize: loggedIn(),
      async resolve(_parent, { props }, { prisma, user }) {
        if (!user || user.users_typeID !== 7) {
          throw new TypeError('Unauthorized')
        }

        const {
          users_login,
          users_password,
          users_name,
          users_identificationNumber,
          users_phoneNumber,
          usersAddress_street,
          usersAddress_houseNumber,
          usersAddress_apartamentNumber,
          usersAddress_postCode,
          usersAddress_city,
          usersAddress_communityID,
          users_typeID,
        } = props

        try {
          const lastUserID = await prisma.users.findMany({
            orderBy: {
              users_ID: 'desc',
            },
            take: 1,
          })

          const hashedPassword = await hash(users_password, 10)

          const newOfficial = await prisma.users.create({
            data: {
              users_ID: lastUserID[0]?.users_ID
                ? lastUserID[0].users_ID + 1
                : 1,
              users_login,
              users_password: hashedPassword,
              users_name,
              // eslint-disable-next-line unicorn/prefer-logical-operator-over-ternary
              users_typeID: users_typeID ? users_typeID : 6,
              users_statusID: 1,
              users_identificationNumber,
              users_phoneNumber,
            },
          })
          const lastAddressID = await prisma.users_Address.findMany({
            orderBy: {
              usersAddress_ID: 'desc',
            },
            take: 1,
          })

          await prisma.users_Address.findFirst({
            where: {
              AND: [
                { usersAddress_userID: user.users_ID },
                { usersAddress_typeID: 3 },
              ],
            },
          })

          await prisma.users_Address.create({
            data: {
              usersAddress_ID: lastAddressID[0]?.usersAddress_ID
                ? lastAddressID[0].usersAddress_ID + 1
                : 1,
              usersAddress_userID: newOfficial.users_ID,
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

          return {
            status: {
              message: 'Success',
              description: `Created new user with id ${newOfficial.users_ID}`,
            },
          }
        } catch {
          return {
            status: {
              message: 'Error',
              description: 'Error while creating new official',
            },
          }
        }
      },
    })
  },
})
